'use client';

import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Bell,
  Search,
  LogOut,
  ChevronRight,
  BadgeCheck,
  Home,
  CreditCard,
  Zap,
  Settings as SettingsIcon,
  AlertCircle,
  Info,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/lib/supabase/client';
import { useRouter, usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

interface HeaderProps {
  user: {
    email: string;
    full_name?: string;
    avatar_url?: string;
  };
}

const mockNotifications = [
  {
    id: '1',
    title: 'Job Completed',
    description: 'Your scraping job "Tech Leads NYC" is finished.',
    time: '5m ago',
    type: 'success',
    icon: Zap,
  },
  {
    id: '2',
    title: 'Credits Low',
    description: 'You have less than 100 credits remaining.',
    time: '2h ago',
    type: 'warning',
    icon: AlertCircle,
  },
  {
    id: '3',
    title: 'System Update',
    description: 'AI qualification engine has been upgraded.',
    time: '1d ago',
    type: 'info',
    icon: Info,
  },
];

export function Header({ user }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  // Breadcrumbs logic
  const getBreadcrumbs = () => {
    const parts = pathname.split('/').filter(Boolean);
    return parts.map((part, index) => {
      const href = '/' + parts.slice(0, index + 1).join('/');
      const label = part.charAt(0).toUpperCase() + part.slice(1);
      return { label, href, isLast: index === parts.length - 1 };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left: Breadcrumbs & Trigger */}
        <div className="flex items-center gap-3 md:gap-4 flex-1">
          <SidebarTrigger className="h-10 w-10 md:h-9 md:w-9 text-muted-foreground hover:text-foreground" />

          <div className="flex items-center gap-2 overflow-hidden">
            {/* Mobile: Only last crumb or "Dashboard" */}
            <div className="md:hidden">
              <span className="text-sm font-bold truncate">
                {breadcrumbs[breadcrumbs.length - 1]?.label || 'Dashboard'}
              </span>
            </div>

            {/* Desktop: Full Breadcrumbs */}
            <div className="hidden md:flex items-center gap-2 text-muted-foreground whitespace-nowrap">
              <Home
                className="h-4 w-4 shrink-0 transition-colors hover:text-primary cursor-pointer"
                onClick={() => router.push('/dashboard')}
              />
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/30" />
              {breadcrumbs.map((crumb) => (
                <div key={crumb.href} className="flex items-center gap-2">
                  <span
                    className={cn(
                      'text-sm transition-all',
                      crumb.isLast
                        ? 'font-bold text-foreground'
                        : 'font-medium hover:text-primary cursor-pointer'
                    )}
                    onClick={() => !crumb.isLast && router.push(crumb.href)}
                  >
                    {crumb.label}
                  </span>
                  {!crumb.isLast && (
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/20" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Search (Hidden on mobile, expandable on tablet/desktop) */}
        <div className="hidden sm:flex flex-[1.5] justify-center max-w-md mx-4">
          <div className="relative w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="search"
              placeholder="Search..."
              className="bg-muted/30 border-border/40 pl-10 h-10 rounded-xl text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 transition-all font-medium w-full"
            />
          </div>
        </div>

        {/* Right: Credits, Notifications, Profile */}
        <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end shrink-0">
          {/* Credits Display */}
          <div
            className="hidden sm:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-1.5 cursor-pointer hover:bg-emerald-500/20 transition-all group"
            onClick={() => router.push('/credits')}
          >
            <Zap className="h-3.5 w-3.5 text-emerald-500 fill-emerald-500 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col leading-none">
              <span className="text-[10px] font-black text-emerald-500 leading-none">1,250</span>
              <span className="text-[8px] font-bold text-emerald-500/60 uppercase tracking-tighter leading-none">
                CREDITS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notification Offcanvas */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 bg-destructive rounded-full" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-background border-border text-foreground w-[350px] sm:w-[400px]">
                <SheetHeader>
                  <div className="flex items-center justify-between mt-4">
                    <SheetTitle className="text-xl font-bold text-foreground">
                      Notifications
                    </SheetTitle>
                    <Badge variant="outline" className="text-[10px]">
                      3 New
                    </Badge>
                  </div>
                  <SheetDescription className="text-muted-foreground text-xs text-left">
                    Live system updates and job notifications.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {mockNotifications.map((n) => (
                    <div
                      key={n.id}
                      className="group relative flex gap-4 p-4 rounded-2xl bg-muted/50 border border-border hover:border-border transition-all cursor-pointer"
                    >
                      <div
                        className={cn(
                          'h-10 w-10 shrink-0 rounded-xl flex items-center justify-center',
                          n.type === 'success'
                            ? 'bg-emerald-500/10 text-emerald-500'
                            : n.type === 'warning'
                              ? 'bg-amber-500/10 text-amber-500'
                              : 'bg-blue-500/10 text-blue-500'
                        )}
                      >
                        <n.icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-foreground">{n.title}</p>
                          <span className="text-[10px] font-medium text-muted-foreground uppercase tabular-nums">
                            {n.time}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed font-regular">
                          {n.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <Button className="w-full font-bold h-12">Clear All Notifications</Button>
                </div>
              </SheetContent>
            </Sheet>
            <ThemeToggle />
          </div>

          <div className="h-6 w-[1px] bg-white/10 mx-1" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 flex items-center gap-3 px-2 rounded-xl border border-border bg-muted/50 hover:bg-muted transition-all group"
              >
                <Avatar className="h-7 w-7 rounded-lg border border-border transition-transform group-hover:scale-105">
                  <AvatarImage src={user.avatar_url} />
                  <AvatarFallback className="bg-muted text-foreground text-[10px] font-bold">
                    {user.email[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:flex flex-col items-start leading-none gap-1">
                  <span className="text-xs font-bold text-foreground">
                    {user.full_name || 'Admin User'}
                  </span>
                  <div className="flex items-center gap-1">
                    <BadgeCheck className="h-3 w-3 text-emerald-500" />
                    <span className="text-[10px] font-bold text-emerald-500 tracking-tight">
                      VERIFIED
                    </span>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-2 rounded-2xl" align="end">
              <DropdownMenuLabel className="px-3 py-2">
                <p className="text-xs font-bold text-foreground">
                  {user.full_name || 'Admin User'}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="rounded-xl cursor-pointer"
                onClick={() => router.push('/settings')}
              >
                <SettingsIcon className="mr-2 h-4 w-4" />
                <span className="text-sm font-medium">Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="rounded-xl cursor-pointer"
                onClick={() => router.push('/credits')}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                <span className="text-sm font-medium">Billing</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="rounded-xl text-destructive cursor-pointer"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span className="text-sm font-medium">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
