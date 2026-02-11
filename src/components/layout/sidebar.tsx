'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
    Briefcase,
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
    useSidebar,
    SidebarTrigger,
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
    const { state } = useSidebar();
    const isCollapsed = state === 'collapsed';

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
    };

    return (
        <Sidebar collapsible="icon" className="border-r border-border bg-sidebar transition-all duration-300">
            <SidebarHeader className="h-14 flex items-center px-4 shrink-0 justify-end border-b border-border/50">
                <div className={cn("flex items-center gap-2.5 px-2", isCollapsed && "justify-center px-0")}>
                    <Link href="/dashboard" className="flex items-center gap-2.5 group/logo overflow-hidden">
                        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary to-primary/80 shadow-lg shadow-primary/20 group-hover/logo:shadow-primary/30 group-hover/logo:scale-105 transition-all duration-500">
                            <Zap className="h-4.5 w-4.5 text-primary-foreground fill-primary-foreground" />
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500" />
                        </div>
                        {!isCollapsed && (
                            <motion.div
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col whitespace-nowrap"
                            >
                                <span className="text-sm font-bold tracking-tight text-foreground leading-none">
                                    LeadScraper
                                </span>
                                <span className="text-[9px] font-semibold text-muted-foreground/70 mt-0.5 tracking-wide">
                                    Intelligence AI
                                </span>
                            </motion.div>
                        )}
                    </Link>
                </div>

            </SidebarHeader>

            <SidebarContent className="px-3 py-4 space-y-6 overflow-y-auto scrollbar-custom">

                {isCollapsed && (
                    <div className="flex justify-center mb-4">
                        <SidebarTrigger className="h-8 w-8 rounded-lg bg-accent/50 hover:bg-accent hover:rotate-180 transition-all duration-300" />
                    </div>
                )}
                <div className="space-y-4">
                    <div className={cn("px-2 transition-all", isCollapsed && "px-0 flex justify-center")}>
                        <Link href="/scrapping" className="block w-full group/extract">
                            <Button className={cn(
                                "w-full rounded-xl bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] transition-all duration-300 font-semibold text-xs gap-2.5 border-none relative overflow-hidden",
                                isCollapsed ? "h-10 w-10 p-0" : "h-11 px-4"
                            )}>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/extract:translate-x-full transition-transform duration-700" />
                                <Plus className="h-4 w-4 relative z-10" />
                                {!isCollapsed && <span className="relative z-10">New Extraction</span>}
                            </Button>
                        </Link>
                    </div>

                    <SidebarMenu className="space-y-1">
                        {!isCollapsed && (
                            <div className="px-3 mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">Navigation</span>
                            </div>
                        )}
                        {navItems.map((item, index) => {
                            const isActive = pathname === item.href;
                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            tooltip={isCollapsed ? item.title : undefined}
                                            className={`h-10 rounded-xl transition-all duration-300 relative group/nav overflow-hidden ${isActive
                                                ? 'bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-semibold shadow-sm border border-primary/20'
                                                : 'text-muted-foreground hover:bg-accent/80 hover:text-foreground hover:scale-[1.02]'
                                                } ${isCollapsed ? 'px-0 justify-center' : 'px-3'}`}
                                        >
                                            <Link href={item.href} className="flex items-center gap-3 w-full">
                                                <div className={cn("relative transition-all duration-300", isActive && "scale-110")}>
                                                    <item.icon className={cn("h-4 w-4 shrink-0 transition-colors", isActive ? 'text-primary' : 'text-muted-foreground group-hover/nav:text-foreground')} />
                                                    {isActive && (
                                                        <div className="absolute inset-0 bg-primary/20 blur-md rounded-full" />
                                                    )}
                                                </div>
                                                {!isCollapsed && <span className="text-sm truncate">{item.title}</span>}
                                                {isActive && !isCollapsed && (
                                                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                                )}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </motion.div>
                            );
                        })}
                    </SidebarMenu>
                </div>

                <div className="space-y-4">
                    <SidebarMenu className="space-y-1">
                        {!isCollapsed && (
                            <div className="px-3 mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">System</span>
                            </div>
                        )}
                        {secondaryItems.map((item, index) => {
                            const isActive = pathname === item.href;
                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: (navItems.length + index) * 0.05 }}
                                >
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            tooltip={isCollapsed ? item.title : undefined}
                                            className={`h-10 rounded-xl transition-all duration-300 relative group/nav overflow-hidden ${isActive
                                                ? 'bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-semibold shadow-sm border border-primary/20'
                                                : 'text-muted-foreground hover:bg-accent/80 hover:text-foreground hover:scale-[1.02]'
                                                } ${isCollapsed ? 'px-0 justify-center' : 'px-3'}`}
                                        >
                                            <Link href={item.href} className="flex items-center gap-3 w-full">
                                                <div className={cn("relative transition-all duration-300", isActive && "scale-110")}>
                                                    <item.icon className={cn("h-4 w-4 shrink-0 transition-colors", isActive ? 'text-primary' : 'text-muted-foreground group-hover/nav:text-foreground')} />
                                                    {isActive && (
                                                        <div className="absolute inset-0 bg-primary/20 blur-md rounded-full" />
                                                    )}
                                                </div>
                                                {!isCollapsed && <span className="text-sm truncate">{item.title}</span>}
                                                {isActive && !isCollapsed && (
                                                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                                )}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </motion.div>
                            );
                        })}
                    </SidebarMenu>
                </div>
            </SidebarContent>

            <SidebarFooter className={cn("p-3 shrink-0 border-t border-border/50", isCollapsed && "px-0 flex justify-center")}>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={handleSignOut}
                            tooltip={isCollapsed ? "Sign Out" : undefined}
                            className={cn(
                                "h-10 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:scale-[1.02] transition-all duration-300 group/signout relative overflow-hidden",
                                isCollapsed ? "px-0 justify-center" : "px-3"
                            )}
                        >
                            <LogOut className="h-4 w-4 group-hover/signout:rotate-12 transition-transform duration-300" />
                            {!isCollapsed && <span className="font-semibold text-sm">Sign Out</span>}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
