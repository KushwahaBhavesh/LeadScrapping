'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';
import { Zap, Loader2, Mail, Lock, User } from 'lucide-react';

export function RegisterForm() {
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
        const fullName = formData.get('fullName') as string;

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push('/register?success=true');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
                    <div className="relative group">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                        <Input
                            name="fullName"
                            type="text"
                            placeholder="John Doe"
                            required
                            className="pl-10 h-12 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-sans"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                    <div className="relative group">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                        <Input
                            name="email"
                            type="email"
                            placeholder="name@company.com"
                            required
                            className="pl-10 h-12 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-sans"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Password</label>
                    <div className="relative group">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                        <Input
                            name="password"
                            type="password"
                            placeholder="Create a strong password"
                            required
                            className="pl-10 h-12 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                    <p className="text-[10px] text-gray-400 ml-1">Must be at least 8 characters with numbers and symbols.</p>
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
                        Creating account...
                    </>
                ) : (
                    <>
                        Join Now
                        <Zap className="ml-2 h-4 w-4 fill-current" />
                    </>
                )}
            </Button>

            <div className="text-xs text-center text-gray-500 dark:text-gray-400 px-4 leading-relaxed">
                By clicking "Join Now", you agree to our{' '}
                <button type="button" className="font-bold text-primary hover:underline">Terms of Service</button>
                {' '}and{' '}
                <button type="button" className="font-bold text-primary hover:underline">Privacy Policy</button>.
            </div>

            <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-100 dark:border-gray-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest text-gray-400">
                    <span className="bg-white dark:bg-gray-900 px-4">Or sign up with</span>
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
