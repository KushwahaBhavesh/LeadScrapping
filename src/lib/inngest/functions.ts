import { inngest } from './client';
import { ScrapingService } from '../services/scraping-service';
import { createClient } from '../supabase/server';
import { JobService } from '../services/job-service';
import { CreditService } from '../services/credit-service';

// =====================================================
// SCRAPING JOB PROCESSOR
// =====================================================

export const processScrapingJob = inngest.createFunction(
  {
    id: 'process-scraping-job',
    retries: 3,
    concurrency: {
      limit: 10, // Process max 10 jobs concurrently
    },
  },
  { event: 'app/scraping.job.created' },
  async ({ event, step }) => {
    const { jobId, urls, userId, organizationId } = event.data;
    const supabase = await createClient();

    // Step 1: Update status to processing
    await step.run('update-job-status-processing', async () => {
      await JobService.updateJobStatus(supabase, jobId, 'processing');
    });

    let successfulCount = 0;
    let failedCount = 0;
    let totalLeadsFound = 0;
    const errors: string[] = [];

    // Step 2: Process each URL with error handling
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];

      const result = await step.run(`scrape-url-${i}`, async () => {
        try {
          // Scrape the URL
          const data = await ScrapingService.scrapeUrl(url);

          // Create leads in DB
          const leads = data.emails.map((email) => ({
            user_id: userId,
            organization_id: organizationId,
            job_id: jobId,
            email,
            company_name: data.companyName,
            source_url: url,
            linkedin_url: data.socialLinks.linkedin,
            twitter_url: data.socialLinks.twitter,
            facebook_url: data.socialLinks.facebook,
            lead_score: data.score,
            lead_status: data.score >= 70 ? 'hot' : data.score >= 40 ? 'warm' : 'cold',
            signals_detected: data.signals,
            qualification_notes: data.notes,
          }));

          // Batch insert leads
          if (leads.length > 0) {
            const { error } = await supabase.from('scraped_leads').upsert(leads, {
              onConflict: 'organization_id,email',
              ignoreDuplicates: false,
            });

            if (error) throw error;
          }

          return {
            success: true,
            leadsFound: leads.length,
            url,
          };
        } catch (error: any) {
          return {
            success: false,
            error: error.message,
            url,
          };
        }
      });

      // Update counters
      if (result.success) {
        successfulCount++;
        totalLeadsFound += (result as any).leadsFound || 0;
      } else {
        failedCount++;
        errors.push(`${result.url}: ${(result as any).error}`);
      }

      // Step 3: Update progress after each batch (every 10 URLs)
      if ((i + 1) % 10 === 0 || i === urls.length - 1) {
        await step.run(`update-progress-${i}`, async () => {
          await JobService.updateJobProgress(supabase, jobId, {
            processedUrls: successfulCount + failedCount,
            successfulUrls: successfulCount,
            failedUrls: failedCount,
            leadsFound: totalLeadsFound,
          });
        });
      }
    }

    // Step 4: Complete the job
    await step.run('complete-job', async () => {
      const status = failedCount === urls.length ? 'failed' : 'completed';
      const errorMessage =
        errors.length > 0
          ? `Failed URLs: ${errors.slice(0, 5).join('; ')}${errors.length > 5 ? '...' : ''}`
          : undefined;

      await JobService.updateJobStatus(supabase, jobId, status, errorMessage);

      // Update final progress
      await JobService.updateJobProgress(supabase, jobId, {
        processedUrls: urls.length,
        successfulUrls: successfulCount,
        failedUrls: failedCount,
        leadsFound: totalLeadsFound,
      });

      // Update actual credits used
      await supabase
        .from('scraping_jobs')
        .update({ credits_used: successfulCount })
        .eq('id', jobId);
    });

    // Step 5: Refund credits for failed URLs
    if (failedCount > 0) {
      await step.run('refund-credits', async () => {
        await CreditService.refundCredits(
          supabase,
          userId,
          failedCount,
          `Refund for ${failedCount} failed URLs in job ${jobId}`,
          jobId
        );
      });
    }

    return {
      successfulCount,
      failedCount,
      totalLeadsFound,
      errors: errors.length,
    };
  }
);

// =====================================================
// WEBHOOK NOTIFICATION HANDLER
// =====================================================

export const sendJobCompletionWebhook = inngest.createFunction(
  { id: 'send-job-completion-webhook' },
  { event: 'app/scraping.job.completed' },
  async ({ event, step }) => {
    const { jobId, userId, status } = event.data;
    const supabase = await createClient();

    // Get user's webhook configuration
    const { data: webhooks } = await supabase
      .from('webhooks')
      .select('*')
      .eq('user_id', userId)
      .eq('event_type', 'job.completed')
      .eq('is_active', true);

    if (!webhooks || webhooks.length === 0) {
      return { sent: false, reason: 'No active webhooks configured' };
    }

    // Send webhook to each configured endpoint
    for (const webhook of webhooks) {
      await step.run(`send-webhook-${webhook.id}`, async () => {
        try {
          const response = await fetch(webhook.url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Webhook-Signature': webhook.secret || '',
            },
            body: JSON.stringify({
              event: 'job.completed',
              job_id: jobId,
              status,
              timestamp: new Date().toISOString(),
            }),
          });

          // Log webhook delivery
          await supabase.from('webhook_logs').insert({
            webhook_id: webhook.id,
            event_type: 'job.completed',
            status_code: response.status,
            response_body: await response.text(),
          });

          return { success: response.ok };
        } catch (error: any) {
          // Log failed webhook
          await supabase.from('webhook_logs').insert({
            webhook_id: webhook.id,
            event_type: 'job.completed',
            status_code: 0,
            error_message: error.message,
          });

          return { success: false, error: error.message };
        }
      });
    }

    return { sent: true, webhookCount: webhooks.length };
  }
);
