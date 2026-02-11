"use client";

import Link from 'next/link';
import { ShieldAlert, Terminal, Radio, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function AuthCodeErrorPage() {
    return (
        <main className="relative min-h-screen flex items-center justify-center p-6 bg-background selection:bg-red-500/20 overflow-hidden">
            {/* --- MINIMALIST ERROR BACKDROP --- */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 blueprint opacity-[0.03]" />

                {/* Soft Red Ambient Radiance */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[140px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[480px] z-10"
            >
                {/* Error Header */}
                <div className="mb-10 flex flex-col items-center text-center space-y-6">
                    <div className="h-16 w-16 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20 shadow-[0_20px_40px_rgba(239,68,68,0.1)]">
                        <ShieldAlert className="h-8 w-8 text-red-500" />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-3xl font-black text-foreground tracking-tight uppercase italic leading-none">
                            Sync_Interrupted
                        </h1>
                        <p className="text-[10px] font-mono font-bold text-red-500/40 uppercase tracking-[0.4em]">
                            Error_Code: 502_TOKEN_EXPIRED
                        </p>
                    </div>
                </div>

                {/* Exception Card */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-[48px] blur-2xl opacity-50" />

                    <div className="relative bg-white/[0.02] border border-red-500/10 rounded-[48px] p-8 md:p-12 backdrop-blur-3xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden text-center">
                        <div className="relative z-10 flex flex-col items-center space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-lg font-bold text-foreground/80 tracking-tight italic">Authentication handshake failed.</h2>
                                <p className="text-sm text-foreground/40 font-medium leading-relaxed max-w-[300px]">
                                    The security token provided is no longer valid or has been revoked by the security mesh.
                                </p>
                            </div>

                            <div className="flex flex-col w-full gap-4">
                                <Link href="/register" className="w-full">
                                    <Button className="w-full h-16 text-md font-black rounded-2xl bg-red-600 hover:bg-red-500 text-white uppercase tracking-[0.2em] shadow-lg transition-all">
                                        Reinitialize_Node
                                    </Button>
                                </Link>

                                <Link href="/login" className="w-full">
                                    <Button variant="ghost" className="w-full h-14 text-xs font-bold rounded-xl border border-white/5 hover:bg-white/5 text-foreground/40 hover:text-foreground uppercase tracking-[0.2em] transition-all">
                                        Back_to_Identity
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Subtle Error Accent */}
                        <div className="absolute -bottom-6 -right-6 opacity-[0.03]">
                            <AlertTriangle className="w-32 h-32" />
                        </div>
                    </div>
                </div>

                {/* System Telemetry */}
                <div className="mt-8 flex justify-between items-center px-4 opacity-20">
                    <div className="flex items-center gap-3">
                        <Terminal className="h-3.5 w-3.5 text-red-500" />
                        <span className="text-[8px] font-mono font-bold uppercase tracking-[0.2em]">STATE: EXCEPTION</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Radio className="h-3.5 w-3.5 text-red-500 animate-pulse" />
                        <span className="text-[8px] font-mono font-bold uppercase tracking-[0.2em]">MESH: CONNECTED</span>
                    </div>
                </div>
            </motion.div>

            {/* Grain Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] grain" />
        </main>
    );
}
