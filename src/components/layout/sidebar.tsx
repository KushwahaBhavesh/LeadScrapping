'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    Briefcase,
    ChevronRight,
    CreditCard,
    LayoutDashboard,
    LogOut,
    Settings,
    Users,
    Zap,
    Plus,
    Key,
    Webhook,
} from 'lucide-react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

const navItems = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Leads',
        href: '/leads',
        icon: Users,
    },
    {
        title: 'Jobs',
        href: '/jobs',
        icon: Briefcase,
    },
];

const secondaryItems = [
    {
        title: 'Credits',
        href: '/credits',
        icon: CreditCard,
    },
    {
        title: 'API Keys',
        href: '/api-keys',
        icon: Key,
    },
    {
        title: 'Webhooks',
        href: '/webhooks',
        icon: Webhook,
    },
    {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
    },
];

export function AppSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
    };

    return (
        <Sidebar className="border-r border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/50 backdrop-blur-xl">
            <SidebarHeader className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-gray-800">
                <Link href="/dashboard" className="flex items-center gap-3 group">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
                        <Zap className="h-5 w-5 text-white fill-white" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                        LeadScraper <span className="text-primary italic">AI</span>
                    </span>
                </Link>
            </SidebarHeader>

            <SidebarContent className="px-4 py-8 space-y-8">
                <div>
                    <div className="px-2 mb-4">
                        <Button className="w-full justify-start h-11 rounded-xl shadow-lg shadow-primary/10 font-bold gap-2">
                            <Plus className="h-4 w-4" />
                            New Scraper Job
                        </Button>
                    </div>

                    <SidebarMenu className="space-y-1">
                        <div className="px-4 mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Main</span>
                        </div>
                        {navItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname === item.href}
                                    className={`h-11 rounded-xl px-4 transition-all duration-200 ${pathname === item.href
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20 font-bold'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'
                                        }`}
                                >
                                    <Link href={item.href} className="flex items-center gap-3">
                                        <item.icon className={`h-5 w-5 ${pathname === item.href ? 'text-white' : ''}`} />
                                        <span>{item.title}</span>
                                        {pathname === item.href && (
                                            <ChevronRight className="ml-auto h-4 w-4 text-white/70" />
                                        )}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </div>

                <div>
                    <SidebarMenu className="space-y-1">
                        <div className="px-4 mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">System</span>
                        </div>
                        {secondaryItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname === item.href}
                                    className={`h-11 rounded-xl px-4 transition-all duration-200 ${pathname === item.href
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20 font-bold'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900'
                                        }`}
                                >
                                    <Link href={item.href} className="flex items-center gap-3">
                                        <item.icon className="h-5 w-5" />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </div>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-gray-100 dark:border-gray-800">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={handleSignOut}
                            className="h-11 rounded-xl px-4 text-destructive hover:bg-destructive/5 transition-colors"
                        >
                            <LogOut className="h-5 w-5" />
                            <span className="font-semibold">Sign out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
