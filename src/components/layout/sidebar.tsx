'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Settings,
  LogOut,
  Zap,
  ChevronLeft,
  ChevronRight,
  Database,
  ListTodo,
  Key,
  Webhook,
  CreditCard,
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
} from '@/components/ui/sidebar';
import { createClient } from '@/lib/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const menuGroups = [
  {
    label: 'MAIN',
    items: [{ title: 'Overview', href: '/dashboard', icon: LayoutDashboard }],
  },
  {
    label: 'LEAD GENERATION',
    items: [
      { title: 'Scrapping', href: '/dashboard/scrapping', icon: Zap },
      { title: 'Jobs', href: '/dashboard/jobs', icon: ListTodo },
      { title: 'Leads', href: '/dashboard/leads', icon: Database },
    ],
  },
  {
    label: 'DEVELOPER',
    items: [
      { title: 'API Keys', href: '/dashboard/api-keys', icon: Key },
      { title: 'Webhooks', href: '/dashboard/webhooks', icon: Webhook },
    ],
  },
  {
    label: 'ACCOUNT',
    items: [
      { title: 'Credits', href: '/dashboard/credits', icon: CreditCard },
      { title: 'Settings', href: '/dashboard/settings', icon: Settings },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="h-16 flex flex-row items-center justify-between px-4">
        <div className={cn('flex items-center gap-3', isCollapsed && 'hidden')}>
          <div className="h-8 w-8 bg-primary flex items-center justify-center rounded-lg">
            <Zap className="h-5 w-5 text-primary-foreground fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-sidebar-foreground leading-tight uppercase tracking-tight">
              Lead Gen AI
            </span>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-none">
              System
            </span>
          </div>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-1 hover:bg-sidebar-accent rounded-md transition-colors text-muted-foreground"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 space-y-6">
        {menuGroups.map((group) => (
          <div key={group.label} className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 py-2">
                <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest leading-none">
                  {group.label}
                </span>
              </div>
            )}
            <SidebarMenu>
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={isCollapsed ? item.title : undefined}
                      className={cn(
                        'h-10 rounded-xl transition-all duration-200',
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
                      )}
                    >
                      <Link href={item.href} className="flex items-center gap-3">
                        <item.icon
                          className={cn(
                            'h-4 w-4 shrink-0',
                            isActive ? 'text-sidebar-accent-foreground' : 'text-muted-foreground'
                          )}
                        />
                        {!isCollapsed && <span className="text-sm font-medium">{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </div>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className={cn('flex items-center gap-3', isCollapsed && 'justify-center')}>
          <Avatar className="h-8 w-8 border border-sidebar-border">
            <AvatarImage src="" />
            <AvatarFallback className="bg-sidebar-accent text-sidebar-foreground text-[10px] font-bold">
              LS
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-xs font-bold text-sidebar-foreground truncate leading-tight">
                Lead Gen User
              </span>
              <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-tight leading-none">
                FREE_TIER
              </span>
            </div>
          )}
        </div>
        <SidebarMenu className="mt-4">
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleSignOut}
              className="h-10 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all font-bold uppercase text-[10px] tracking-widest"
            >
              <LogOut className="h-4 w-4" />
              {!isCollapsed && <span>Sign Out</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
