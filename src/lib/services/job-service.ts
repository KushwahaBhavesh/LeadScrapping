import { SupabaseClient } from '@supabase/supabase-js';

export interface CreateJobParams {
  userId: string;
  organizationId: string | null;
  type: 'single' | 'bulk' | 'sitemap';
  totalUrls: number;
  options?: Record<string, unknown>;
  creditsEstimated: number;
}

export interface Job {
  id: string;
  user_id: string;
  organization_id: string | null;
  type: string;
  status: string;
  total_urls: number;
  processed_urls: number;
  successful_urls: number;
  failed_urls: number;
  leads_found: number;
  credits_used: number;
  credits_estimated: number;
  options: Record<string, unknown>;
  error_message: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export class JobService {
  /**
   * Create a new scraping job
   */
  static async createJob(supabase: SupabaseClient, params: CreateJobParams): Promise<Job> {
    const { data: job, error } = await supabase
      .from('scraping_jobs')
      .insert({
        user_id: params.userId,
        organization_id: params.organizationId,
        type: params.type,
        status: 'pending',
        total_urls: params.totalUrls,
        options: params.options || {},
        credits_estimated: params.creditsEstimated,
      })
      .select()
      .single();

    if (error) throw error;
    return job as Job;
  }

  /**
   * Get job by ID with authorization check
   */
  static async getJob(
    supabase: SupabaseClient,
    jobId: string,
    userId: string
  ): Promise<Job | null> {
    const { data: job, error } = await supabase
      .from('scraping_jobs')
      .select('*')
      .eq('id', jobId)
      .eq('user_id', userId)
      .single();

    if (error) return null;
    return job as Job;
  }

  /**
   * Update job status
   */
  static async updateJobStatus(
    supabase: SupabaseClient,
    jobId: string,
    status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled',
    errorMessage?: string
  ): Promise<void> {
    const updates: Partial<Job> = { status };

    if (status === 'processing') {
      updates.started_at = new Date().toISOString();
    } else if (status === 'completed' || status === 'failed') {
      updates.completed_at = new Date().toISOString();
    }

    if (errorMessage) {
      updates.error_message = errorMessage;
    }

    const { error } = await supabase.from('scraping_jobs').update(updates).eq('id', jobId);

    if (error) throw error;
  }

  /**
   * Update job progress
   */
  static async updateJobProgress(
    supabase: SupabaseClient,
    jobId: string,
    progress: {
      processedUrls: number;
      successfulUrls: number;
      failedUrls: number;
      leadsFound: number;
    }
  ): Promise<void> {
    const { error } = await supabase
      .from('scraping_jobs')
      .update({
        processed_urls: progress.processedUrls,
        successful_urls: progress.successfulUrls,
        failed_urls: progress.failedUrls,
        leads_found: progress.leadsFound,
      })
      .eq('id', jobId);

    if (error) throw error;
  }
}
