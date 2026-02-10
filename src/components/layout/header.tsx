'use client';

import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, Search, User } from 'lucide-react';
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
        <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md px-6 md:px-8 shadow-sm">
            <div className="flex items-center gap-4 flex-1">
                <SidebarTrigger className="h-10 w-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors" />
                <div className="h-8 w-[1px] bg-gray-100 dark:bg-gray-800 mx-1 hidden sm:block" />
                <div className="relative w-full max-w-md hidden sm:block">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        type="search"
                        placeholder="Search leads, jobs, or documentation..."
                        className="w-full bg-gray-50/50 dark:bg-gray-900/50 pl-10 h-10 border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-gray-500 hover:text-primary transition-colors relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary ring-2 ring-white dark:ring-gray-950" />
                </Button>

                <div className="h-8 w-[1px] bg-gray-100 dark:bg-gray-800 mx-1" />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 flex items-center gap-3 px-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 transition-all">
                            <span className="hidden md:block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                {user.full_name || user.email.split('@')[0]}
                            </span>
                            <Avatar className="h-8 w-8 border-2 border-primary/10 shadow-sm">
                                <AvatarImage src={user.avatar_url} alt={user.email} />
                                <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                                    {user.email[0].toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 rounded-xl shadow-xl border-gray-100 dark:border-gray-800" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-bold leading-none">{user.full_name || 'User'}</p>
                                <p className="text-xs leading-none text-gray-500 dark:text-gray-400">
                                    {user.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="rounded-lg cursor-pointer py-2.5">
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="rounded-lg cursor-pointer py-2.5 text-destructive focus:text-destructive"
                            onClick={handleSignOut}
                        >
                            Sign out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
