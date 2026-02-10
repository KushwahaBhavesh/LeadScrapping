"use client";

import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { Send, Zap, Mail, ArrowRight, ShieldCheck, Terminal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Magnetic } from "../ui/magnetic";
import { cn } from "@/lib/utils";

export function Newsletter() {
    const [email, setEmail] = useState("");
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const yVal = useTransform(scrollYProgress, [0, 1], [-50, 50]);
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
            className="relative py-20 md:py-24 overflow-hidden bg-background border-y border-foreground/5 grain"
        >
            {/* --- CHROMATIC GLOW ENGINE (SCALED) --- */}
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

            <div className="px-8 mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 max-w-7xl mx-auto">

                    {/* Compact Narrative Block */}
                    <div className="text-left space-y-6 max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, x: -15 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-foreground/10 glass backdrop-blur-xl"
                        >
                            <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.6)]" />
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-foreground/40">Alpha Stream Transmission</span>
                        </motion.div>

                        <div className="space-y-4">
                            <motion.h2
                                style={{ x: titleX }}
                                className="text-4xl md:text-5xl font-black tracking-tighter text-foreground leading-[0.9] uppercase italic text-glow"
                            >
                                Subscribe <br />
                                <span className="text-primary not-italic">newsletter</span>
                            </motion.h2>
                            <p className="text-lg text-foreground/40 font-medium max-w-sm leading-relaxed italic tracking-tight">
                                Proprietary data architecture for lead engineers. Delivered every Tuesday.
                            </p>
                        </div>
                    </div>

                    {/* Compact Integrated Glass Hub */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="w-full lg:max-w-xl relative"
                    >
                        <div className="absolute inset-0 bg-primary/5 blur-[60px] rounded-full" />

                        <form className="relative group overflow-hidden">
                            <div className="relative flex flex-col sm:flex-row items-center p-2 rounded-[32px] glass hover:border-primary/40 focus-within:border-primary/40 transition-all duration-700 shadow-xl">
                                <div className="hidden sm:flex pl-6 items-center text-foreground/10 group-focus-within:text-primary transition-colors">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter system endpoint..."
                                    className="w-full h-14 sm:h-16 px-6 bg-transparent text-lg font-bold text-foreground placeholder:text-foreground/10 focus:outline-none"
                                />
                                <Magnetic>
                                    <Button
                                        type="submit"
                                        className="w-full sm:w-auto h-14 sm:h-16 px-10 rounded-2xl bg-primary text-primary-foreground hover:opacity-90 font-black text-base transition-all active:scale-95 group/btn relative overflow-hidden"
                                    >
                                        <span className="relative z-10">CONNECT</span>
                                    </Button>
                                </Magnetic>
                            </div>

                            <div className="mt-8 flex items-center justify-center lg:justify-start gap-8 opacity-20">
                                <div className="flex items-center gap-2.5 text-[9px] font-black uppercase tracking-[0.3em] text-foreground/40">
                                    <Terminal className="h-3.5 w-3.5" />
                                    <span>Encrypted</span>
                                </div>
                                <div className="h-3 w-[1px] bg-foreground/10" />
                                <div className="flex items-center gap-2.5 text-[9px] font-black uppercase tracking-[0.3em] text-foreground/40">
                                    <ShieldCheck className="h-3.5 w-3.5" />
                                    <span>Validated</span>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* Scale-Down Watermark */}
            <div className="absolute bottom-0 right-0 p-8 text-[120px] font-black text-foreground/[0.01] pointer-events-none select-none tracking-tighter leading-none italic uppercase">
                SIGNAL
            </div>
        </section>
    );
}
