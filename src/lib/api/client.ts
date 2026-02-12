/**
 * API Client for Lead Scraping Platform
 * Provides type-safe methods to interact with backend APIs
 */

import { createClient } from '@/lib/supabase/client';

// =====================================================
// TYPE DEFINITIONS
// =====================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  pagination?: {
    total: number;
    limit: number;
    offset: number;
    has_more: boolean;
  };
}

export interface Job {
  id: string;
  user_id: string;
  type: 'single' | 'bulk' | 'sitemap';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  total_urls: number;
  processed_urls: number;
  successful_urls: number;
  failed_urls: number;
  leads_found: number;
  credits_used: number;
  credits_estimated: number;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
  error_message?: string;
}

export interface Lead {
  id: string;
  email: string;
  company_name: string | null;
  full_name: string | null;
  lead_score: number;
  lead_status: 'hot' | 'warm' | 'cold';
  signals_detected: string[];
  qualification_notes: string | null;
  source_url: string;
  linkedin_url: string | null;
  twitter_url: string | null;
  facebook_url: string | null;
  created_at: string;
  job_id: string;
}

export interface CreateJobRequest {
  type: 'single' | 'bulk' | 'sitemap';
  urls: string[];
  options?: {
    depth?: number;
    extract_emails?: boolean;
    extract_phones?: boolean;
    extract_social?: boolean;
    qualify_leads?: boolean;
  };
}

export interface ExportLeadsRequest {
  format: 'csv' | 'json';
  filters?: {
    job_id?: string;
    score_min?: number;
    status?: 'hot' | 'warm' | 'cold';
    created_after?: string;
    created_before?: string;
  };
  fields?: string[];
  limit?: number;
}

// =====================================================
// API CLIENT CLASS
// =====================================================

class ApiClient {
  private async getAuthHeaders(): Promise<HeadersInit> {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return {
      'Content-Type': 'application/json',
      ...(session?.access_token && {
        Authorization: `Bearer ${session.access_token}`,
      }),
    };
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const headers = await this.getAuthHeaders();

      const response = await fetch(endpoint, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });

      // Handle non-JSON responses (like CSV downloads)
      const contentType = response.headers.get('content-type');
      if (contentType && !contentType.includes('application/json')) {
        return {
          success: response.ok,
          data: (await response.blob()) as any,
        };
      }

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || {
            code: 'unknown_error',
            message: 'An unknown error occurred',
          },
        };
      }

      return data;
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'network_error',
          message: error.message || 'Network request failed',
        },
      };
    }
  }

  // =====================================================
  // JOBS API
  // =====================================================

  async createJob(data: CreateJobRequest): Promise<ApiResponse<Job>> {
    return this.request<Job>('/api/scrapping', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async listJobs(params?: {
    limit?: number;
    offset?: number;
    status?: Job['status'];
    type?: Job['type'];
    sort_by?: 'created_at' | 'completed_at';
    sort_order?: 'asc' | 'desc';
  }): Promise<ApiResponse<Job[]>> {
    const searchParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
    }

    const url = `/api/jobs${searchParams.toString() ? `?${searchParams}` : ''}`;
    return this.request<Job[]>(url);
  }

  async getJob(jobId: string): Promise<ApiResponse<Job>> {
    return this.request<Job>(`/api/jobs/${jobId}`);
  }

  // =====================================================
  // LEADS API
  // =====================================================

  async listLeads(params?: {
    job_id?: string;
    limit?: number;
    offset?: number;
    search?: string;
    status?: Lead['lead_status'];
    score_min?: number;
    sort_by?: 'created_at' | 'lead_score' | 'company_name';
    sort_order?: 'asc' | 'desc';
  }): Promise<ApiResponse<Lead[]>> {
    const searchParams = new URLSearchParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
    }

    const url = `/api/leads${searchParams.toString() ? `?${searchParams}` : ''}`;
    return this.request<Lead[]>(url);
  }

  async exportLeads(data: ExportLeadsRequest): Promise<ApiResponse<Blob>> {
    const response = await fetch('/api/leads/export', {
      method: 'POST',
      headers: await this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.error,
      };
    }

    const blob = await response.blob();
    return {
      success: true,
      data: blob,
    };
  }

  // =====================================================
  // HELPER METHODS
  // =====================================================

  downloadFile(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
