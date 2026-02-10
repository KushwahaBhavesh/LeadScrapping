import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Briefcase } from 'lucide-react';

export default async function JobsPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

    return (
        <DashboardLayout
            user={{
                email: user.email!,
                full_name: profile?.full_name,
                avatar_url: profile?.avatar_url,
            }}
        >
            <div className="p-8 md:p-12 lg:p-16 space-y-12 bg-gray-50/50 dark:bg-gray-950/50 min-h-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-display-l text-gray-900 dark:text-white">Jobs</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Track and manage your scraping workflows
                        </p>
                    </div>
                    <Button className="font-bold shadow-lg shadow-primary/20 px-6 h-11 rounded-xl">
                        <Plus className="mr-2 h-4 w-4" />
                        New Scraper Job
                    </Button>
                </div>

                <Card className="border-gray-100 dark:border-gray-800 shadow-lg rounded-2xl overflow-hidden">
                    <CardHeader className="p-8">
                        <CardTitle className="text-xl font-bold">Scraping History</CardTitle>
                        <CardDescription>View your scraping job execution logs</CardDescription>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                        <div className="flex flex-col items-center justify-center h-96 text-gray-400 font-mono text-xs border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900">
                            <Briefcase className="h-12 w-12 mb-4 opacity-10" />
                            No jobs found. Create your first scraping job to get started.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
