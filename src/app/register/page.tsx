'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Zap, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { RegisterForm } from '@/components/auth/register-form';
import { MeshBackground } from '@/components/ui/mesh-background';
import { Button } from '@/components/ui/button';

function RegisterContent() {
    const searchParams = useSearchParams();
    const isSuccess = searchParams.get('success') === 'true';

    if (isSuccess) {
        return (
            <div className="w-full max-w-md animate-fade-in text-center">
                <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl p-12 rounded-[40px] border border-white/20 dark:border-gray-800/50 shadow-2xl relative overflow-hidden">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 dark:bg-emerald-900/20 mb-8 animate-float">
                        <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Verification sent
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed text-lg">
                        We've sent a magic link to your email. Please check your inbox to activate your account.
                    </p>
                    <Link href="/login" className="block">
                        <Button className="w-full h-14 text-lg font-bold shadow-xl shadow-primary/20 rounded-2xl">
                            Return to login
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md animate-fade-in mt-12 mb-12">
            <div className="flex flex-col items-center mb-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-2xl shadow-primary/40 mb-6 -rotate-3 hover:rotate-0 transition-transform duration-300">
                    <Zap className="h-8 w-8 text-white fill-white" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                    Start Scraping
                </h1>
                <p className="text-gray-500 dark:text-gray-400 font-sans text-center max-w-[280px]">
                    Join 10,000+ teams scaling their outbound with AI.
                </p>
            </div>

            <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-2xl p-10 rounded-[32px] border border-white/20 dark:border-gray-800/50 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />

                <RegisterForm />

                <div className="mt-10 text-center text-sm">
                    <p className="text-gray-500 dark:text-gray-400">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="font-bold text-primary hover:underline underline-offset-4"
                        >
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>

            <p className="mt-10 text-center text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest font-mono">
                No credit card required to start
            </p>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <main className="relative min-h-screen flex items-center justify-center p-4 overflow-y-auto">
            <MeshBackground />

            <div className="absolute top-8 left-8">
                <Link href="/">
                    <Button variant="ghost" className="gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        <ChevronLeft className="h-4 w-4" />
                        Back to site
                    </Button>
                </Link>
            </div>

            <Suspense fallback={
                <div className="flex h-screen items-center justify-center">
                    <Zap className="h-10 w-10 text-primary animate-pulse" />
                </div>
            }>
                <RegisterContent />
            </Suspense>
        </main>
    );
}
