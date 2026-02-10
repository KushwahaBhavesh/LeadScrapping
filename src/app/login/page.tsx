import Link from 'next/link';
import { Zap, ChevronLeft } from 'lucide-react';
import { LoginForm } from '@/components/auth/login-form';
import { MeshBackground } from '@/components/ui/mesh-background';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
    return (
        <main className="relative min-h-screen flex items-center justify-center p-4">
            <MeshBackground />

            <div className="absolute top-8 left-8">
                <Link href="/">
                    <Button variant="ghost" className="gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        <ChevronLeft className="h-4 w-4" />
                        Back to site
                    </Button>
                </Link>
            </div>

            <div className="w-full max-w-md animate-fade-in">
                <div className="flex flex-col items-center mb-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-2xl shadow-primary/40 mb-6 rotate-3 hover:rotate-0 transition-transform duration-300">
                        <Zap className="h-8 w-8 text-white fill-white" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                        Welcome back
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-sans text-center">
                        Launch your next lead campaign in seconds.
                    </p>
                </div>

                <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl p-10 rounded-[32px] border border-white/20 dark:border-gray-800/50 shadow-2xl relative overflow-hidden">
                    {/* Decorative subtle stripe */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />

                    <LoginForm />

                    <div className="mt-10 text-center text-sm">
                        <p className="text-gray-500 dark:text-gray-400">
                            New to LeadScraper?{' '}
                            <Link
                                href="/register"
                                className="font-bold text-primary hover:underline underline-offset-4"
                            >
                                Start free trial
                            </Link>
                        </p>
                    </div>
                </div>

                <p className="mt-10 text-center text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-mono">
                    Secured by Supabase & Next.js
                </p>
            </div>
        </main>
    );
}
