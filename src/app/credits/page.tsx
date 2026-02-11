import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, History } from 'lucide-react';

export default async function CreditsPage() {
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
                        <h1 className="text-display-l text-gray-900 dark:text-white">Credits</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Manage your scraping quota and usage history
                        </p>
                    </div>
                    <Button className="font-bold shadow-lg shadow-primary/20 px-6 h-11 rounded-xl">
                        Buy More Credits
                    </Button>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    <Card className="border-primary bg-primary text-primary-foreground rounded-3xl shadow-xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-white/10 rounded-full blur-[60px]" />
                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-2">
                                <Zap className="h-5 w-5 fill-white" />
                                <span className="text-xs font-bold uppercase tracking-widest text-primary-foreground/60">Current Balance</span>
                            </div>
                            <div className="text-5xl font-extrabold tracking-tighter italic">450</div>
                            <p className="text-sm text-primary-foreground/80">Credits expire in 12 days.</p>
                        </div>
                    </Card>

                    <Card className="md:col-span-2 border-gray-100 dark:border-gray-800 shadow-lg rounded-3xl bg-white dark:bg-gray-900 p-8 flex items-center justify-between">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Professional Plan</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm">
                                You are currently on the professional plan with 5,000 monthly credits.
                            </p>
                            <div className="flex items-center gap-4 pt-2">
                                <div className="h-2 w-48 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[91%]" />
                                </div>
                                <span className="text-xs font-bold text-primary">91% used</span>
                            </div>
                        </div>
                        <Button variant="outline" className="rounded-xl font-bold px-8 h-12 border-gray-200">
                            Upgrade
                        </Button>
                    </Card>
                </div>

                <Card className="border-gray-100 dark:border-gray-800 shadow-lg rounded-2xl overflow-hidden">
                    <CardHeader className="p-8 border-b border-gray-50 dark:border-gray-800 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-bold">Usage History</CardTitle>
                            <CardDescription>Track every credit spent across your jobs</CardDescription>
                        </div>
                        <History className="h-5 w-5 text-gray-400" />
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400 font-mono text-xs border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl mt-8">
                            No recent transactions found.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
