import { z } from 'zod';
import { rateLimiters } from '@/lib/middleware/rate-limit';
import { CreditService } from '@/lib/services/credit-service';
import { JobService } from '@/lib/services/job-service';
import { inngest } from '@/lib/inngest/client';
import { successResponse, errorResponse } from '@/lib/utils/api-response';
import {
  createApiRoute,
  withAuth,
  withRateLimit,
  withValidation,
} from '@/lib/middleware/api-middleware';

// =====================================================
// VALIDATION SCHEMA
// =====================================================

const scrapingSchema = z.object({
  type: z.enum(['single', 'bulk', 'sitemap']),
  urls: z.array(z.string().url()).min(1).max(10000, 'Maximum 10,000 URLs per job'),
  options: z
    .object({
      depth: z.number().int().min(1).max(3).optional().default(1),
      extract_emails: z.boolean().optional().default(true),
      extract_phones: z.boolean().optional().default(true),
      extract_social: z.boolean().optional().default(true),
      qualify_leads: z.boolean().optional().default(true),
    })
    .optional(),
});

// =====================================================
// HELPER FUNCTIONS
// =====================================================

function calculateEstimatedCost(data: z.infer<typeof scrapingSchema>): number {
  const baseCreditsPerUrl = 1;
  const depthMultiplier = data.options?.depth || 1;
  return Math.ceil(data.urls.length * baseCreditsPerUrl * depthMultiplier);
}

function estimateCompletionTime(urlCount: number): string {
  const secondsPerUrl = 2;
  const estimatedSeconds = urlCount * secondsPerUrl;
  const completionDate = new Date(Date.now() + estimatedSeconds * 1000);
  return completionDate.toISOString();
}

// =====================================================
// BUSINESS LOGIC
// =====================================================

async function createScrapingJob(req: Request, context: any) {
  const { user, supabase, validated } = context;

  // Check credits
  const estimatedCost = calculateEstimatedCost(validated);
  const creditCheck = await CreditService.checkCredits(supabase, user.id, estimatedCost);

  if (!creditCheck.hasEnough) {
    return errorResponse(
      'insufficient_credits',
      `Insufficient credits. Required: ${estimatedCost}, Available: ${creditCheck.currentBalance}`,
      402
    );
  }

  // Create job
  const job = await JobService.createJob(supabase, {
    userId: user.id,
    organizationId: user.user_metadata?.organization_id || null,
    type: validated.type,
    totalUrls: validated.urls.length,
    options: validated.options,
    creditsEstimated: estimatedCost,
  });

  // Deduct credits with rollback on failure
  try {
    await CreditService.deductCredits(
      supabase,
      user.id,
      estimatedCost,
      `Scraping job ${job.id}`,
      job.id
    );
  } catch (creditError) {
    await supabase.from('scraping_jobs').delete().eq('id', job.id);
    throw creditError;
  }

  // Trigger background job
  await inngest.send({
    name: 'app/scraping.job.created',
    data: {
      jobId: job.id,
      urls: validated.urls,
      userId: user.id,
      organizationId: job.organization_id,
      options: validated.options,
    },
    user: { id: user.id },
  });

  return successResponse(
    {
      id: job.id,
      type: job.type,
      status: job.status,
      total_urls: job.total_urls,
      credits_used: estimatedCost,
      created_at: job.created_at,
      estimated_completion: estimateCompletionTime(validated.urls.length),
    },
    201
  );
}

// =====================================================
// ROUTE HANDLER
// =====================================================

export const POST = createApiRoute(createScrapingJob, [
  withAuth(),
  withRateLimit(rateLimiters.scraping),
  withValidation(scrapingSchema, 'body'),
]);
