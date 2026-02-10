// Database types
export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string;
                    email: string;
                    full_name: string | null;
                    avatar_url: string | null;
                    role: 'admin' | 'member' | 'viewer';
                    organization_id: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<Database['public']['Tables']['users']['Row'], 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['users']['Insert']>;
            };
            organizations: {
                Row: {
                    id: string;
                    name: string;
                    slug: string;
                    owner_id: string | null;
                    plan: 'free' | 'starter' | 'pro' | 'enterprise';
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<
                    Database['public']['Tables']['organizations']['Row'],
                    'id' | 'created_at' | 'updated_at'
                >;
                Update: Partial<Database['public']['Tables']['organizations']['Insert']>;
            };
            scraping_jobs: {
                Row: {
                    id: string;
                    user_id: string;
                    organization_id: string | null;
                    type: 'single' | 'bulk' | 'sitemap';
                    status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
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
                };
                Insert: Omit<
                    Database['public']['Tables']['scraping_jobs']['Row'],
                    'id' | 'created_at' | 'updated_at'
                >;
                Update: Partial<Database['public']['Tables']['scraping_jobs']['Insert']>;
            };
            scraped_leads: {
                Row: {
                    id: string;
                    user_id: string;
                    organization_id: string | null;
                    job_id: string | null;
                    email: string | null;
                    phone: string | null;
                    full_name: string | null;
                    job_title: string | null;
                    company_name: string | null;
                    linkedin_url: string | null;
                    twitter_url: string | null;
                    facebook_url: string | null;
                    lead_score: number;
                    lead_status: 'hot' | 'warm' | 'cold';
                    qualification_notes: string | null;
                    signals_detected: string[] | null;
                    source_url: string;
                    custom_notes: string | null;
                    tags: string[] | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<
                    Database['public']['Tables']['scraped_leads']['Row'],
                    'id' | 'created_at' | 'updated_at'
                >;
                Update: Partial<Database['public']['Tables']['scraped_leads']['Insert']>;
            };
            credits: {
                Row: {
                    id: string;
                    user_id: string;
                    organization_id: string | null;
                    balance: number;
                    total_purchased: number;
                    total_used: number;
                    created_at: string;
                    updated_at: string;
                };
                Insert: Omit<
                    Database['public']['Tables']['credits']['Row'],
                    'id' | 'created_at' | 'updated_at'
                >;
                Update: Partial<Database['public']['Tables']['credits']['Insert']>;
            };
        };
    };
}

// Auth types
export interface User {
    id: string;
    email: string;
    full_name?: string;
    avatar_url?: string;
    role: 'admin' | 'member' | 'viewer';
    organization_id?: string;
}

export interface AuthSession {
    user: User;
    access_token: string;
    refresh_token: string;
    expires_at: number;
}

// Lead types
export interface Lead {
    id: string;
    email?: string;
    phone?: string;
    full_name?: string;
    job_title?: string;
    company_name?: string;
    linkedin_url?: string;
    twitter_url?: string;
    facebook_url?: string;
    lead_score: number;
    lead_status: 'hot' | 'warm' | 'cold';
    qualification_notes?: string;
    signals_detected?: string[];
    source_url: string;
    custom_notes?: string;
    tags?: string[];
    created_at: string;
    updated_at: string;
}

// Job types
export interface ScrapingJob {
    id: string;
    type: 'single' | 'bulk' | 'sitemap';
    status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
    total_urls: number;
    processed_urls: number;
    successful_urls: number;
    failed_urls: number;
    leads_found: number;
    credits_used: number;
    credits_estimated: number;
    options: {
        depth?: number;
        extract_emails?: boolean;
        extract_phones?: boolean;
        extract_social?: boolean;
        qualify_leads?: boolean;
    };
    error_message?: string;
    started_at?: string;
    completed_at?: string;
    created_at: string;
    updated_at: string;
}

// API types
export interface ApiResponse<T = unknown> {
    data?: T;
    error?: {
        code: string;
        message: string;
        details?: Record<string, unknown>;
    };
    pagination?: {
        has_more: boolean;
        next_cursor?: string;
    };
}

export interface PaginationParams {
    limit?: number;
    cursor?: string;
}

// Form types
export interface LoginFormData {
    email: string;
    password: string;
}

export interface RegisterFormData {
    email: string;
    password: string;
    full_name: string;
}

export interface ResetPasswordFormData {
    email: string;
}
