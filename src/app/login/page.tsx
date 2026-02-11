"use client";

import Link from 'next/link';
import { Zap, ChevronLeft, ShieldCheck, Terminal, Activity } from 'lucide-react';
import { LoginForm } from '@/components/auth/login-form';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function LoginPage() {
    return (
        <main className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-background grain">
            {/* Blueprint Grid Layer */}
            <div className="absolute inset-0 blueprint pointer-events-none opacity-5" />

            {/* Ambient Intelligence Glow */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[20%] w-[600px] h-[600px] bg-indigo-500/[0.04] rounded-full blur-[140px]" />
                <div className="absolute bottom-[20%] right-[20%] w-[600px] h-[600px] bg-purple-500/[0.04] rounded-full blur-[140px]" />
            </div>

            {/* Navigation Back Link */}
            <div className="absolute top-8 left-8 z-50">
                <Link href="/">
                    <Button variant="ghost" className="gap-2 text-foreground/50 hover:text-foreground hover:bg-transparent group">
                        <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        <span className="font-mono text-xs tracking-widest uppercase">Return_to_Base</span>
                    </Button>
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="w-full max-w-md relative z-10"
            >
                {/* Header Section */}
                <div className="flex flex-col items-center mb-8 text-center space-y-4">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse" />
                        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-indigo-600 shadow-2xl shadow-primary/30 border border-white/10">
                            <Zap className="h-8 w-8 text-white fill-white" />
                        </div>
                    </motion.div>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-black tracking-tight text-foreground uppercase tracking-wider text-glow">
                            System Access
                        </h1>
                        <div className="flex items-center justify-center gap-2 text-xs font-mono text-foreground/40 uppercase tracking-widest">
                            <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Secure_Link</span>
                            <span className="text-primary/50">|</span>
                            <span className="flex items-center gap-1"><Terminal className="h-3 w-3" /> v2.4.0</span>
                        </div>
                    </div>
                </div>

                {/* Main Card */}
                <div className="glass rounded-[32px] p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden group">
                    {/* Scanner Effect */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out" />

                    <div className="relative z-10">
                        <div className="mb-8 p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-start gap-3">
                            <Activity className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <p className="text-xs text-foreground/60 leading-relaxed font-medium">
                                <strong className="text-primary block mb-1 uppercase tracking-wider text-[10px]">Session Protocol</strong>
                                Please authenticate to access your intelligence dashboard. All actions are logged.
                            </p>
                        </div>

                        <LoginForm />

                        <div className="mt-8 pt-6 border-t border-foreground/5 text-center">
                            <p className="text-sm text-foreground/40 font-medium">
                                Unregistered Node?{' '}
                                <Link
                                    href="/register"
                                    className="text-primary hover:text-primary/80 font-bold transition-colors hover:underline underline-offset-4"
                                >
                                    Initialize Setup
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Metadata */}
                <div className="mt-8 flex justify-between items-center text-[10px] font-mono text-foreground/20 uppercase tracking-widest px-4">
                    <span>ID: 884-2A</span>
                    <span>Encrypted :: AES-256</span>
                </div>
            </motion.div>
        </main>
    );
}
