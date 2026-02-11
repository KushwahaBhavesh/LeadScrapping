'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Zap, ChevronLeft, CheckCircle2, Cpu, Network, Shield } from 'lucide-react';
import { RegisterForm } from '@/components/auth/register-form';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

function RegisterContent() {
    const searchParams = useSearchParams();
    const isSuccess = searchParams.get('success') === 'true';

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md text-center relative z-10"
            >
                <div className="glass rounded-[40px] p-12 border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.1)] relative overflow-hidden">
                    {/* Success Pulse */}
                    <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-500/10 mb-8 border border-emerald-500/20 shadow-xl">
                            <CheckCircle2 className="h-12 w-12 text-emerald-500" />
                        </div>
                        <h1 className="text-3xl font-black text-foreground mb-4 tracking-tight uppercase">
                            Signal Verified
                        </h1>
                        <p className="text-foreground/60 mb-10 leading-relaxed text-lg font-medium">
                            A secure magic link has been dispatched to your endpoint. Please authorize to finalize connection.
                        </p>
                        <Link href="/login" className="block w-full">
                            <Button className="w-full h-16 text-lg font-black shadow-xl shadow-emerald-500/20 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white uppercase tracking-widest transition-all hover:scale-[1.02]">
                                Acknowledgement_Received
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md relative z-10"
        >
            {/* Header */}
            <div className="flex flex-col items-center mb-10 text-center space-y-4">
                <div className="relative">
                    <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse" />
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-indigo-600 shadow-2xl shadow-primary/30 border border-white/10 -rotate-6 hover:rotate-0 transition-all duration-500">
                        <Zap className="h-8 w-8 text-white fill-white" />
                    </div>
                </div>

                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tight text-foreground uppercase text-glow">
                        Initialize Node
                    </h1>
                    <p className="text-foreground/40 font-mono text-xs uppercase tracking-[0.2em]">
                        Join the Distributed Intelligence Grid
                    </p>
                </div>
            </div>

            {/* Main Form Card */}
            <div className="glass rounded-[32px] p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />

                <div className="mb-8 flex justify-center gap-6 opacity-50">
                    {[Cpu, Network, Shield].map((Icon, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 group">
                            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <Icon className="h-4 w-4 text-primary" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="relative z-10">
                    <p className="text-xs text-center text-foreground/40 font-mono mb-6 uppercase tracking-widest border-b border-white/5 pb-4">
                        Protocol: New_User_Registration
                    </p>
                    <RegisterForm />

                    <div className="mt-8 pt-6 border-t border-foreground/5 text-center">
                        <p className="text-sm text-foreground/40 font-medium">
                            Already Connected?{' '}
                            <Link
                                href="/login"
                                className="text-primary hover:text-primary/80 font-bold transition-colors hover:underline underline-offset-4"
                            >
                                Identify
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <p className="mt-8 text-center text-[10px] text-foreground/20 uppercase tracking-[0.3em] font-mono">
                Rapid Deployment // No Payment Required
            </p>
        </motion.div>
    );
}

export default function RegisterPage() {
    return (
        <main className="relative min-h-screen flex items-center justify-center p-4 overflow-y-auto bg-background grain">
            {/* Blueprint Grid Layer */}
            <div className="absolute inset-0 blueprint pointer-events-none opacity-5" />

            {/* Ambient Backlighting */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px]" />
            </div>

            <div className="absolute top-8 left-8 z-50">
                <Link href="/">
                    <Button variant="ghost" className="gap-2 text-foreground/50 hover:text-foreground hover:bg-transparent group">
                        <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        <span className="font-mono text-xs tracking-widest uppercase">Abort_Setup</span>
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
