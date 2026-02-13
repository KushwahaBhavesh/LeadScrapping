import { NextResponse } from 'next/server';
import { createApiRoute, withAuth } from '@/lib/middleware/api-middleware';
import { successResponse, internalErrorResponse } from '@/lib/utils/api-response';

async function getDashboardStats(req: Request, context: any) {
    const { user, supabase } = context;

    try {
        // 1. Total Leads
        // Get total count
        const { count: totalLeads, error: leadsError } = await supabase
            .from('scraped_leads')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id);

        if (leadsError) throw leadsError;

        // Get count for this month for "stats change"
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const { count: leadsThisMonth, error: monthlyError } = await supabase
            .from('scraped_leads')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .gte('created_at', startOfMonth.toISOString());

        if (monthlyError) throw monthlyError;

        // 2. Active Jobs
        const { count: activeJobs, error: jobsError } = await supabase
            .from('scraping_jobs')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .in('status', ['processing', 'pending']);

        if (jobsError) throw jobsError;

        // 3. Success Rate (Completed / Total Jobs)
        const { data: jobStats, error: jobStatsError } = await supabase
            .from('scraping_jobs')
            .select('status')
            .eq('user_id', user.id);

        if (jobStatsError) throw jobStatsError;

        const totalJobs = jobStats?.length || 0;
        const completedJobs = jobStats?.filter((j: any) => j.status === 'completed').length || 0;
        const successRate = totalJobs > 0 ? (completedJobs / totalJobs) * 100 : 0;

        // 4. Credits Used
        // Try to get from credits table first
        const { data: creditsData, error: creditsError } = await supabase
            .from('credits')
            .select('total_used, balance')
            .eq('user_id', user.id)
            .single();

        // If no credits record, default to 0
        const totalCreditsUsed = creditsData?.total_used || 0;
        const creditsBalance = creditsData?.balance || 0;

        // 5. Activity data (Hourly leads for the last 12 hours)
        const hourlyActivity = [];
        for (let i = 11; i >= 0; i--) {
            const start = new Date();
            start.setHours(start.getHours() - i, 0, 0, 0);
            const end = new Date();
            end.setHours(end.getHours() - i + 1, 0, 0, 0);

            const { count: hourlyCount } = await supabase
                .from('scraped_leads')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', user.id)
                .gte('created_at', start.toISOString())
                .lt('created_at', end.toISOString());

            hourlyActivity.push({
                hour: start.getHours(),
                count: hourlyCount || 0,
            });
        }

        return successResponse({
            totalLeads: totalLeads || 0,
            leadsThisMonth: leadsThisMonth || 0,
            activeJobs: activeJobs || 0,
            successRate: Math.round(successRate * 10) / 10,
            creditsUsed: totalCreditsUsed,
            creditsBalance: creditsBalance,
            activity: hourlyActivity,
        });
    } catch (error: any) {
        return internalErrorResponse(error);
    }
}

export const GET = createApiRoute(getDashboardStats, [withAuth()]);
