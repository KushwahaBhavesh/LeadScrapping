"use client";

import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Zap, Target, Cpu, ShieldCheck, Activity, Brain, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Magnetic } from "../ui/magnetic";
import { cn } from "@/lib/utils";

export function CTA() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);
    const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.3, 0.1]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { left, top } = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    return (
        <section ref={containerRef} onMouseMove={handleMouseMove} className="py-20 md:py-32 relative overflow-hidden bg-background grain">

            {/* The External Aura */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none z-0">
                <motion.div
                    style={{ opacity: glowOpacity }}
                    className="w-[1000px] h-[400px] bg-primary/10 rounded-full blur-[140px]"
                />
            </div>

            <div className="container px-4 mx-auto relative z-10">

                <motion.div
                    style={{ scale }}
                    className="relative max-w-5xl mx-auto rounded-[64px] glass p-10 md:p-20 text-center overflow-hidden shadow-2xl transition-all duration-700 hover:border-primary/20"
                >
                    {/* Background Intelligence Layer */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05)_0%,transparent_70%)]" />

                        <motion.div
                            style={{
                                x: useTransform(mouseX, [0, 1000], [20, -20]),
                                y: useTransform(mouseY, [0, 600], [20, -20])
                            }}
                            className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"
                        />
                    </div>

                    <div className="relative z-10 flex flex-col items-center space-y-12 text-glow">

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="flex items-center gap-3 px-6 py-2 rounded-full glass backdrop-blur-xl shadow-sm border-primary/10"
                        >
                            <Sparkles className="h-3.5 w-3.5 text-primary" />
                            <div className="h-4 w-[1px] bg-primary/20" />
                            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary/60">Status: Deployment Ready</span>
                        </motion.div>

                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-[80px] font-[1000] tracking-tighter text-foreground leading-[0.85] uppercase italic">
                                Ready to <br />
                                <span className="text-foreground/10 not-italic">extraction</span>
                            </h2>
                            <p className="text-xl md:text-2xl text-foreground/30 font-medium max-w-lg mx-auto leading-tight italic tracking-tight">
                                Launch your autonomous extraction nodes today.
                            </p>
                        </div>

                        <div className="w-full max-w-md pt-4">
                            <Magnetic>
                                <Link href="/register" className="relative group block">
                                    <div className="absolute -inset-4 bg-primary rounded-full blur-2xl opacity-0 group-hover:opacity-10 transition duration-700" />

                                    <Button
                                        size="lg"
                                        className="w-full h-16 sm:h-20 text-xl font-black rounded-2xl bg-primary text-primary-foreground hover:opacity-90 transition-all duration-500 shadow-xl flex items-center justify-between px-10 group/btn relative overflow-hidden"
                                    >
                                        <span className="relative z-10 uppercase italic">START EXTRACTION</span>
                                        <div className="h-10 w-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-all duration-500 relative z-10">
                                            <ArrowRight className="h-5 w-5" />
                                        </div>
                                    </Button>
                                </Link>
                            </Magnetic>
                        </div>

                        <div className="pt-16 flex items-center justify-center gap-10 opacity-30">
                            {[
                                { icon: ShieldCheck, label: "GDPR Sync" },
                                { icon: Cpu, label: "Neural Node" },
                                { icon: Activity, label: "Uptime 99.9%" }
                            ].map((stat, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <stat.icon className="h-4 w-4" />
                                    <span className="text-[8px] font-black uppercase tracking-[0.3em]">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="absolute bottom-10 right-10 text-[10px] font-black tracking-[0.5em] text-foreground/[0.05] uppercase italic">
                ESTABLISH_LINK_V5
            </div>
        </section>
    );
}
