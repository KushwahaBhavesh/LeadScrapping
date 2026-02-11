"use client";

import Link from 'next/link';
import { Zap, ChevronLeft, Shield, Database, Cpu, Network, TrendingUp, Users, Globe } from 'lucide-react';
import { LoginForm } from '@/components/auth/login-form';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function LoginPage() {
    return (
        <main className="relative min-h-screen flex bg-background">
            {/* LEFT PANEL - Form Section */}
            <div className="relative w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-20 overflow-y-auto">
                {/* Back Button */}
                <div className="absolute top-8 left-8">
                    <Link href="/">
                        <Button variant="ghost" className="h-12 px-6 gap-3 rounded-full border border-white/5 hover:bg-white/5 group text-foreground/40 hover:text-foreground transition-all">
                            <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">Home</span>
                        </Button>
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-[440px] mx-auto"
                >
                    {/* Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-14 w-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                                <Zap className="h-7 w-7 text-white fill-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black text-foreground tracking-tight">Welcome Back</h1>
                                <p className="text-sm text-foreground/40 font-medium mt-1">Sign in to your account</p>
                            </div>
                        </div>
                    </div>

                    {/* Login Form */}
                    <div className="space-y-6">
                        <LoginForm />

                        <div className="pt-6 border-t border-white/5">
                            <p className="text-sm text-foreground/40 text-center">
                                Don't have an account? {' '}
                                <Link href="/register" className="text-primary hover:text-white transition-all font-bold">
                                    Create one now
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Footer Metrics */}
                    <div className="mt-16 pt-8 border-t border-white/5">
                        <div className="grid grid-cols-2 gap-6 opacity-40">
                            <div className="flex items-center gap-3">
                                <Shield className="h-4 w-4 text-emerald-500" />
                                <div>
                                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-foreground/60">Security</div>
                                    <div className="text-xs font-bold text-foreground">AES-256 Encrypted</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Database className="h-4 w-4 text-primary" />
                                <div>
                                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-foreground/60">Status</div>
                                    <div className="text-xs font-bold text-foreground">All Systems Active</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* RIGHT PANEL - Visual/Branding Section */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary/10 via-indigo-500/10 to-purple-500/10 overflow-hidden">
                <div className="absolute inset-0 blueprint opacity-[0.05]" />

                {/* Ambient Glow */}
                <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px]" />

                <div className="relative z-10 flex flex-col justify-center p-16 xl:p-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-12"
                    >
                        {/* Hero Content */}
                        <div className="space-y-6">
                            <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                                <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-foreground/60">Lead Intelligence Platform</span>
                            </div>
                            <h2 className="text-5xl xl:text-6xl font-black text-foreground tracking-tight leading-[1.1]">
                                Extract. Analyze.<br />
                                <span className="text-primary">Dominate.</span>
                            </h2>
                            <p className="text-lg text-foreground/60 font-medium leading-relaxed max-w-[480px]">
                                Harness the power of intelligent lead scraping to fuel your business growth with precision-targeted data.
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-8 pt-8">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <TrendingUp className="h-5 w-5" />
                                </div>
                                <div className="text-3xl font-black text-foreground">98.7%</div>
                                <div className="text-xs font-medium text-foreground/40 uppercase tracking-wider">Accuracy Rate</div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Users className="h-5 w-5" />
                                </div>
                                <div className="text-3xl font-black text-foreground">10K+</div>
                                <div className="text-xs font-medium text-foreground/40 uppercase tracking-wider">Active Users</div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Globe className="h-5 w-5" />
                                </div>
                                <div className="text-3xl font-black text-foreground">150+</div>
                                <div className="text-xs font-medium text-foreground/40 uppercase tracking-wider">Countries</div>
                            </div>
                        </div>

                        {/* Decorative Tech Elements */}
                        <div className="absolute bottom-20 right-20 opacity-[0.03]">
                            <Network className="w-64 h-64" />
                        </div>
                        <div className="absolute top-20 left-20 opacity-[0.03]">
                            <Cpu className="w-48 h-48" />
                        </div>
                    </motion.div>
                </div>

                {/* Grain Texture */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] grain" />
            </div>
        </main>
    );
}
