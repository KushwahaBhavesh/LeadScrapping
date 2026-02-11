import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ScrappingInterface } from '@/components/scrapping/scrapping-interface';

export default async function ScrappingPage() {
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
                <ScrappingInterface />
            </div>
        </DashboardLayout>
    );
}
