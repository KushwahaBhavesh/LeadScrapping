"use client";

import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { Mail, ShieldCheck, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Magnetic } from "../ui/magnetic";

export function Newsletter() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { left, top } = sectionRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    const titleX = useTransform(mouseX, [0, 1200], [-10, 10]);

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="relative py-24 md:py-32 overflow-hidden bg-background border-y border-foreground/5 grain"
        >
            {/* Blueprint Grid Layer */}
            <div className="absolute inset-0 blueprint pointer-events-none opacity-5" />

            {/* --- CHROMATIC GLOW ENGINE --- */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                    style={{
                        scale: glowScale,
                        x: useTransform(mouseX, [0, 1200], [20, -20]),
                        y: useTransform(mouseY, [0, 600], [20, -20])
                    }}
                    className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none"
                />
            </div>

            <div className="container px-8 mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-32 max-w-7xl mx-auto">

                    {/* Compact Narrative Block */}
                    <div className="text-left space-y-8 max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, x: -15 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-foreground/10 glass backdrop-blur-xl"
                        >
                            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--color-primary),0.6)]" />
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-foreground/40">Syncing Intelligence Protocol</span>
                        </motion.div>

                        <div className="space-y-6">
                            <motion.h2
                                style={{ x: titleX }}
                                className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-[0.9] uppercase italic text-glow"
                            >
                                Stay in the <br />
                                <span className="text-primary not-italic">Agentic_Feed.</span>
                            </motion.h2>
                            <p className="text-xl text-foreground/40 font-medium max-w-sm leading-relaxed italic tracking-tight">
                                Get a weekly digest of high-fidelity extraction protocols and autonomous agent patterns.
                            </p>
                        </div>

                        {/* Creative Component: Minimal Terminal Feed */}
                        <div className="hidden md:block glass rounded-2xl p-6 border-primary/5 shadow-2xl overflow-hidden group">
                            <div className="flex items-center gap-2 mb-4 border-b border-foreground/5 pb-2">
                                <div className="h-2 w-2 rounded-full bg-red-500/40" />
                                <div className="h-2 w-2 rounded-full bg-yellow-500/40" />
                                <div className="h-2 w-2 rounded-full bg-green-500/40" />
                                <span className="ml-2 text-[8px] font-mono text-foreground/20 font-bold tracking-widest uppercase">system_feed.log</span>
                            </div>
                            <div className="space-y-2 font-mono text-[10px] text-foreground/30 font-medium">
                                <p className="flex justify-between"><span>[OK] Protocol: HTTP/2 Indexing</span> <span className="text-primary/40">24ms</span></p>
                                <p className="flex justify-between"><span>[OK] Agent Status: Active_Syncing</span> <span className="text-primary/40">Online</span></p>
                                <p className="flex justify-between"><span className="animate-pulse">[...] Awaiting Subscription Signal</span> <span className="text-primary/40">PENDING</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Compact Integrated Glass Hub */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="w-full lg:max-w-2xl relative"
                    >
                        <div className="absolute inset-0 bg-primary/5 blur-[80px] rounded-full" />

                        <form className="relative group">
                            <div className="relative flex flex-col sm:flex-row items-center p-3 rounded-[40px] glass hover:border-primary/20 focus-within:border-primary/40 transition-all duration-700 shadow-2xl">
                                <div className="hidden sm:flex pl-8 items-center text-foreground/10 group-focus-within:text-primary transition-colors">
                                    <Mail className="h-7 w-7" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    placeholder="your@intel.endpoint"
                                    className="w-full h-16 sm:h-20 px-8 bg-transparent text-xl font-bold text-foreground placeholder:text-foreground/10 focus:outline-none"
                                />
                                <Magnetic>
                                    <Button
                                        type="submit"
                                        className="w-full sm:w-auto h-16 sm:h-20 px-12 rounded-3xl bg-primary text-primary-foreground hover:opacity-90 font-black text-lg transition-all active:scale-95 group/btn relative overflow-hidden"
                                    >
                                        <span className="relative z-10 italic uppercase">Subscribe_to_Intelligence</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    </Button>
                                </Magnetic>
                            </div>

                            <div className="mt-10 flex items-center justify-center lg:justify-start gap-10 opacity-30">
                                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30">
                                    <Terminal className="h-4 w-4" />
                                    <span>Encrypted_Stream</span>
                                </div>
                                <div className="h-4 w-[1px] bg-foreground/10" />
                                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30">
                                    <ShieldCheck className="h-4 w-4" />
                                    <span>Protocol_Verified</span>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* Scale-Down Watermark */}
            <div className="absolute bottom-0 right-0 p-12 text-[140px] font-black text-foreground/[0.01] pointer-events-none select-none tracking-tighter leading-none italic uppercase">
                NODE_FLOW
            </div>
        </section>
    );
}
