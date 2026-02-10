import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ArrowUpRight, TrendingUp, Users, Briefcase, Zap } from 'lucide-react';

const stats = [
    {
        name: 'Total Leads',
        value: '2,547',
        change: '+12.5%',
        icon: Users,
    },
    {
        name: 'Active Jobs',
        value: '12',
        change: '+2',
        icon: Briefcase,
    },
    {
        name: 'Scraping Success',
        value: '98.2%',
        change: '+0.5%',
        icon: Zap,
    },
    {
        name: 'Credits Used',
        value: '4,231',
        change: '+842',
        icon: TrendingUp,
    },
];

export default async function DashboardPage() {
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
            <div className="p-8 space-y-8 bg-gray-50/50 dark:bg-gray-950/50 min-h-full">
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-display-l text-gray-900 dark:text-white">
                            Dashboard
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Welcome back, {profile?.full_name || user.email?.split('@')[0]}
                        </p>
                    </div>
                    <Button className="font-bold shadow-lg shadow-primary/20 px-6 h-11 rounded-xl">
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Job
                    </Button>
                </div>

                {/* Stats grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <Card key={stat.name} className="border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all cursor-pointer group rounded-2xl overflow-hidden">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.name}</CardTitle>
                                <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-900 group-hover:bg-primary/10 transition-colors">
                                    <stat.icon className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{stat.value}</div>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${stat.change.startsWith('+')
                                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
                                            : 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                                        }`}>
                                        {stat.change}
                                    </span>
                                    <span className="text-xs text-gray-400">vs last month</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Main Dashboard Content */}
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Welcome card */}
                    <Card className="lg:col-span-2 border-primary bg-primary text-primary-foreground rounded-3xl overflow-hidden shadow-2xl relative">
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-[80px]" />
                        <CardHeader className="relative z-10 px-8 pt-10">
                            <CardTitle className="text-2xl font-bold">
                                🎉 Welcome to LeadScraper AI!
                            </CardTitle>
                            <CardDescription className="text-primary-foreground/80 text-lg mt-2 font-sans">
                                Your account is 75% setup. Completion helps us tailor lead
                                discovery to your specific target market.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="relative z-10 px-8 pb-10 space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Button variant="secondary" className="w-full h-12 font-bold shadow-lg rounded-xl">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Launch First Job
                                </Button>
                                <Button variant="outline" className="w-full h-12 bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl">
                                    Explore Documentation
                                    <ArrowUpRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Secondary widget */}
                    <Card className="border-gray-100 dark:border-gray-800 rounded-3xl shadow-lg p-8 flex flex-col justify-center bg-white dark:bg-gray-900">
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center">
                                <TrendingUp className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Growth Mode</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                You have <span className="text-primary font-bold">450 credits</span> remaining this month.
                            </p>
                            <Button variant="outline" className="w-full rounded-xl border-gray-200">
                                Upgrade Plan
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Recent activity */}
                <div className="grid gap-8 md:grid-cols-2">
                    <Card className="border-gray-100 dark:border-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                        <CardHeader className="px-8 pt-8">
                            <CardTitle className="text-xl font-bold">Recent Jobs</CardTitle>
                            <CardDescription>Your latest scraping jobs</CardDescription>
                        </CardHeader>
                        <CardContent className="px-8 pb-8">
                            <div className="flex flex-col items-center justify-center h-48 text-gray-400 font-mono text-xs border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-xl">
                                <Briefcase className="h-8 w-8 mb-4 opacity-20" />
                                No active jobs found.
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-100 dark:border-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                        <CardHeader className="px-8 pt-8">
                            <CardTitle className="text-xl font-bold">Recent Leads</CardTitle>
                            <CardDescription>Your latest discovered leads</CardDescription>
                        </CardHeader>
                        <CardContent className="px-8 pb-8">
                            <div className="flex flex-col items-center justify-center h-48 text-gray-400 font-mono text-xs border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-xl">
                                <Users className="h-8 w-8 mb-4 opacity-20" />
                                No leads found in this period.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
