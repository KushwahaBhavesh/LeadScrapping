'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Zap } from 'lucide-react';
import { RegisterForm } from '@/components/auth/register-form';
import { Button } from '@/components/ui/button';

function RegisterContent() {
    const searchParams = useSearchParams();
    const isSuccess = searchParams.get('success') === 'true';

    if (isSuccess) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-950">
                <div className="absolute inset-0 -z-10 bg-primary overflow-hidden">
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px]" />
                </div>

                <div className="w-full max-w-md p-10 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl text-center border border-emerald-100 dark:border-emerald-900/30">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 mb-6">
                        <Zap className="h-8 w-8 text-emerald-500 fill-emerald-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Check your email
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                        We've sent a magic link to your email. Click the link to verify your
                        account and start scraping leads.
                    </p>
                    <Link href="/login" className="w-full">
                        <Button className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20 rounded-xl">
                            Return to login
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen">
            {/* Left side - Branded informational panel */}
            <div className="relative hidden w-0 flex-1 lg:block bg-primary overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-blue-600 opacity-95" />

                {/* Decorative mesh */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[80px]" />

                <div className="relative flex h-full flex-col justify-between p-12 text-white">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-xl group-hover:rotate-3 transition-transform">
                            <Zap className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">LeadScraper AI</span>
                    </Link>

                    <div>
                        <h2 className="text-display-l font-bold tracking-tight mb-8 leading-tight">
                            Scale your outbound <br />
                            <span className="text-white/70 italic">without the grind.</span>
                        </h2>
                        <ul className="space-y-6 text-lg text-white/80">
                            {[
                                'Infinite scraping pipelines',
                                'Real-time contact discovery',
                                'GDPR compliant verification',
                                'Powerful API for developers'
                            ].map((text) => (
                                <li key={text} className="flex items-center gap-4">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 shrink-0">
                                        <Zap className="h-3 w-3 text-white fill-white" />
                                    </div>
                                    {text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-xs text-white/40 font-mono tracking-widest uppercase">
                            The Developer's Choice
                        </p>
                        <div className="flex gap-4">
                            <div className="w-2 h-2 rounded-full bg-white/20" />
                            <div className="w-2 h-2 rounded-full bg-white/20" />
                            <div className="w-2 h-2 rounded-full bg-white/40" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Register form */}
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-gray-50 dark:bg-gray-950">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="text-center lg:text-left">
                        <Link href="/" className="lg:hidden flex justify-center mb-8">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-xl">
                                <Zap className="h-7 w-7 text-white" />
                            </div>
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Create your account
                        </h1>
                        <p className="mt-3 text-gray-500 dark:text-gray-400 font-sans">
                            Start finding high-quality leads in minutes
                        </p>
                    </div>

                    <div className="mt-10 p-8 sm:p-10 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-2xl relative overflow-hidden">
                        {/* Decorative subtle stripe */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-primary/10" />

                        <RegisterForm />

                        <div className="mt-10 text-center text-sm">
                            <p className="text-gray-500 dark:text-gray-400">
                                Already have an account?{' '}
                                <Link
                                    href="/login"
                                    className="font-bold text-primary hover:underline underline-offset-4"
                                >
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
                <Zap className="h-8 w-8 text-primary animate-pulse" />
            </div>
        }>
            <RegisterContent />
        </Suspense>
    );
}
