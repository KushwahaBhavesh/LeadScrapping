'use client';

import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, Search, User, LogOut } from 'lucide-react';
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
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';

interface HeaderProps {
    user: {
        email: string;
        full_name?: string;
        avatar_url?: string;
    };
}

export function Header({ user }: HeaderProps) {
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
    };

    return (
        <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-md border-b border-border/50">
            <div className="flex h-14 items-center justify-between px-4 md:px-8">
                <div className="flex items-center gap-4 flex-1">
                    <SidebarTrigger className="h-8 w-8 md:hidden rounded-md hover:bg-accent transition-colors" />

                    <div className="relative w-full max-w-sm hidden lg:block group/search">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within/search:text-foreground transition-colors" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full bg-accent/30 pl-9 h-9 border-transparent focus:bg-accent/50 focus:ring-0 rounded-lg text-sm transition-all placeholder:text-muted-foreground"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md text-muted-foreground hover:text-foreground transition-colors">
                        <Bell className="h-4 w-4" />
                    </Button>

                    <ThemeToggle />

                    <div className="h-4 w-[1px] bg-border/50 mx-2" />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-9 flex items-center gap-2 px-2 rounded-lg hover:bg-accent transition-all group/profile">
                                <Avatar className="h-7 w-7 border border-border">
                                    <AvatarImage src={user.avatar_url} alt={user.email} />
                                    <AvatarFallback className="bg-primary text-primary-foreground text-[10px] font-bold">
                                        {user.email[0].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="hidden md:flex flex-col items-start gap-0">
                                    <span className="text-xs font-bold text-foreground leading-none">
                                        {user.full_name || user.email.split('@')[0]}
                                    </span>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 p-1 rounded-lg bg-popover border-border shadow-xl" align="end">
                            <DropdownMenuLabel className="px-3 py-2">
                                <p className="text-xs font-bold text-foreground">{user.full_name || 'User'}</p>
                                <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="rounded-md cursor-pointer focus:bg-accent">
                                <User className="mr-2 h-4 w-4" />
                                <span className="text-sm font-medium">Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="rounded-md cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
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
