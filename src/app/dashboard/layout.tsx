import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

export default async function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase.from('users').select('*').eq('id', user.id).single();

  return (
    <DashboardLayout
      user={{
        email: user.email!,
        full_name: profile?.full_name,
        avatar_url: profile?.avatar_url,
      }}
    >
      {children}
    </DashboardLayout>
  );
}
