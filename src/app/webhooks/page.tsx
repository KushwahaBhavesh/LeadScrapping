import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Webhook, Plus, Settings2, Activity } from 'lucide-react';

export default async function WebhooksPage() {
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
            <div className="p-4 sm:p-8 md:p-12 lg:p-16 space-y-12 bg-gray-50/50 dark:bg-gray-950/50 min-h-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-display-l text-gray-900 dark:text-white">Webhooks</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Receive real-time notifications for completed scraping jobs
                        </p>
                    </div>
                    <Button className="font-bold shadow-lg shadow-primary/20 px-6 h-11 rounded-xl">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Endpoint
                    </Button>
                </div>

                <Card className="border-gray-100 dark:border-gray-800 shadow-lg rounded-2xl overflow-hidden">
                    <CardHeader className="p-8 border-b border-gray-50 dark:border-gray-800 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-bold">Configured Endpoints</CardTitle>
                            <CardDescription>Manage your destination URLs for data events</CardDescription>
                        </div>
                        <Activity className="h-5 w-5 text-emerald-500 animate-pulse" />
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                        <div className="flex flex-col items-center justify-center h-96 text-gray-400 font-mono text-xs border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl mt-8 bg-white dark:bg-gray-900">
                            <Webhook className="h-12 w-12 mb-4 opacity-10" />
                            No webhook endpoints configured.
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-8 md:grid-cols-2">
                    <Card className="border-gray-100 dark:border-gray-800 shadow-lg rounded-2xl p-8 bg-white dark:bg-gray-900 flex gap-6 items-start">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                            <Settings2 className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-bold text-gray-900 dark:text-white">Test Webhooks</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                Use our CLI tool to test your webhook endpoints locally before
                                deploying to production.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
