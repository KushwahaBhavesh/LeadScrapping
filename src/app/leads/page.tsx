import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

export default async function LeadsPage() {
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
                        <h1 className="text-display-l text-gray-900 dark:text-white">Leads</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Manage and export your discovered leads
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" className="font-bold px-6 h-11 rounded-xl bg-white dark:bg-gray-900 border-gray-200">
                            Import Leads
                        </Button>
                        <Button className="font-bold shadow-lg shadow-primary/20 px-6 h-11 rounded-xl">
                            Export Leads
                        </Button>
                    </div>
                </div>

                <Card className="border-gray-100 dark:border-gray-800 shadow-lg rounded-2xl overflow-hidden">
                    <CardHeader className="p-8">
                        <CardTitle className="text-xl font-bold">All Leads</CardTitle>
                        <CardDescription>View and manage all your verified leads</CardDescription>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                        <div className="flex flex-col items-center justify-center h-96 text-gray-400 font-mono text-xs border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900">
                            <Users className="h-12 w-12 mb-4 opacity-10" />
                            No leads found. Create a scraping job to discover leads.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
