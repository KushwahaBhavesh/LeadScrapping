import { create } from 'zustand';

export interface Job {
    id: string;
    user_id: string;
    organization_id?: string;
    job_type: 'single' | 'bulk' | 'sitemap';
    status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
    total_urls: number;
    processed_urls: number;
    successful_urls: number;
    failed_urls: number;
    leads_found: number;
    credits_used: number;
    started_at?: string;
    completed_at?: string;
    error_message?: string;
    metadata?: Record<string, any>;
    created_at: string;
    updated_at: string;
}

interface JobsState {
    jobs: Job[];
    currentJob: Job | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    setJobs: (jobs: Job[]) => void;
    addJob: (job: Job) => void;
    updateJob: (id: string, updates: Partial<Job>) => void;
    setCurrentJob: (job: Job | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearJobs: () => void;
}

export const useJobsStore = create<JobsState>((set) => ({
    jobs: [],
    currentJob: null,
    isLoading: false,
    error: null,

    setJobs: (jobs) => set({ jobs }),

    addJob: (job) =>
        set((state) => ({
            jobs: [job, ...state.jobs],
        })),

    updateJob: (id, updates) =>
        set((state) => ({
            jobs: state.jobs.map((job) =>
                job.id === id ? { ...job, ...updates } : job
            ),
            currentJob:
                state.currentJob?.id === id
                    ? { ...state.currentJob, ...updates }
                    : state.currentJob,
        })),

    setCurrentJob: (job) => set({ currentJob: job }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    clearJobs: () => set({ jobs: [], currentJob: null, error: null }),
}));
