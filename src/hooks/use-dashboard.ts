import useSWR from 'swr';
import { fetcher } from '@/lib/api/client';

export interface DashboardStats {
    totalLeads: number;
    leadsThisMonth: number;
    activeJobs: number;
    successRate: number;
    creditsUsed: number;
    creditsBalance: number;
    activity: { hour: number; count: number }[];
}

export function useDashboardStats() {
    const { data, error, isLoading, mutate } = useSWR<DashboardStats>('/api/dashboard/stats', fetcher);

    return {
        stats: data,
        isLoading,
        isError: error,
        mutate,
    };
}
