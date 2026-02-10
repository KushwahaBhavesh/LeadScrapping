import Link from 'next/link';
import { Zap } from 'lucide-react';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
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
                            Start discovery in <span className="text-white/70 italic">seconds.</span>
                        </h2>
                        <ul className="space-y-6 text-lg text-white/80">
                            {[
                                'Access 500M+ global profiles',
                                'AI-powered email verification',
                                'Direct CRM integrations',
                                'Pay only for verified leads'
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
                            Enterprise-Grade Intelligence
                        </p>
                        <div className="flex gap-4">
                            <div className="w-2 h-2 rounded-full bg-white/20" />
                            <div className="w-2 h-2 rounded-full bg-white/40" />
                            <div className="w-2 h-2 rounded-full bg-white/20" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Login form */}
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-gray-50 dark:bg-gray-950">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="text-center lg:text-left">
                        <Link href="/" className="lg:hidden flex justify-center mb-8">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-xl">
                                <Zap className="h-7 w-7 text-white" />
                            </div>
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Welcome back
                        </h1>
                        <p className="mt-3 text-gray-500 dark:text-gray-400 font-sans">
                            Enter your credentials to access your dashboard
                        </p>
                    </div>

                    <div className="mt-10 p-8 sm:p-10 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-2xl relative overflow-hidden">
                        {/* Decorative subtle stripe */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-primary/10" />

                        <LoginForm />

                        <div className="mt-10 text-center text-sm">
                            <p className="text-gray-500 dark:text-gray-400">
                                Don't have an account?{' '}
                                <Link
                                    href="/register"
                                    className="font-bold text-primary hover:underline underline-offset-4"
                                >
                                    Create account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
