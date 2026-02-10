'use client';

import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './sidebar';
import { Header } from './header';

interface DashboardLayoutProps {
    children: React.ReactNode;
    user: {
        email: string;
        full_name?: string;
        avatar_url?: string;
    };
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header user={user} />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
