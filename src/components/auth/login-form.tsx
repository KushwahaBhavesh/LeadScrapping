'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';
import { Zap, Loader2, Mail, Lock } from 'lucide-react';

export function LoginForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push('/dashboard');
            router.refresh();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
                <div className="space-y-2.5">
                    <label className="text-[13px] font-bold text-gray-400 dark:text-gray-500 ml-1 uppercase tracking-tight">Email Address</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-all duration-300" />
                        <Input
                            name="email"
                            type="email"
                            placeholder="name@company.com"
                            required
                            className="pl-12 h-14 bg-white/50 dark:bg-gray-950/50 border-gray-100 dark:border-gray-800 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 font-sans text-lg"
                        />
                    </div>
                </div>
                <div className="space-y-2.5">
                    <div className="flex items-center justify-between ml-1">
                        <label className="text-[13px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tight">Password</label>
                        <button type="button" className="text-xs font-bold text-primary hover:underline underline-offset-4">
                            Forgot?
                        </button>
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-all duration-300" />
                        <Input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            className="pl-12 h-14 bg-white/50 dark:bg-gray-950/50 border-gray-100 dark:border-gray-800 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-300 text-lg"
                        />
                    </div>
                </div>
            </div>

            {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-xs font-bold text-destructive animate-in fade-in slide-in-from-top-1">
                    {error}
                </div>
            )}

            <Button
                type="submit"
                className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20 rounded-xl transition-all active:scale-[0.98]"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                    </>
                ) : (
                    <>
                        Sign In
                        <Zap className="ml-2 h-4 w-4 fill-current" />
                    </>
                )}
            </Button>

            <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-100 dark:border-gray-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest text-gray-400">
                    <span className="bg-white dark:bg-gray-900 px-4">Or continue with</span>
                </div>
            </div>

            <Button variant="outline" type="button" className="w-full h-12 font-bold rounded-xl border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-950 transition-colors">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                    />
                    <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                    />
                    <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                    />
                    <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                    />
                </svg>
                Google
            </Button>
        </form>
    );
}
