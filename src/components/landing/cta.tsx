"use client";

import { motion, useMotionValue, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Cpu, ShieldCheck, Activity, Binary, Terminal, Zap, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Magnetic } from "../ui/magnetic";

export function CTA() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // --- AGGRESSIVE SCALE DOWN LOGIC ---
    // Starts massive (1.4x) and lands at 1.0x in the center of the scroll path
    const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [1.4, 1, 1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], ["20px", "0px", "0px", "10px"]);

    // Parallax rotate and background typography
    const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);
    const brandX = useTransform(scrollYProgress, [0, 1], [-100, 100]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const cardRotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), { stiffness: 100, damping: 30 });
    const cardRotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), { stiffness: 100, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            mouseX.set(e.clientX - rect.left - rect.width / 2);
            mouseY.set(e.clientY - rect.top - rect.height / 2);
        }
    };

    return (
        <section
            ref={containerRef}
            className="relative h-[100vh] bg-background overflow-hidden selection:bg-primary/30"
        >
            {/* Background Digital Horizon */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 blueprint opacity-5" />
                <motion.div
                    style={{ x: brandX, rotate }}
                    className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap text-[40vw] font-bold text-foreground/[0.01] uppercase italic leading-none"
                >
                    UPSTREAM_PROTOCOL
                </motion.div>
            </div>

            <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 overflow-hidden">

                <motion.div
                    onMouseMove={handleMouseMove}
                    style={{
                        scale,
                        opacity,
                        filter: `blur(${blur})`,
                        rotateX: cardRotateX,
                        rotateY: cardRotateY,
                        transformStyle: "preserve-3d",
                        perspective: 1200
                    }}
                    className="relative w-full max-w-7xl bg-white/[0.02] border border-white/5 rounded-[60px] md:rounded-[100px] overflow-hidden backdrop-blur-3xl shadow-[0_100px_200px_-50px_rgba(0,0,0,0.8)] glass-premium group"
                >
                    {/* Animated Grid Pulse */}
                    <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--color-primary),0.05)_1px,transparent_1px)] bg-[size:100%_40px]" />
                        <motion.div
                            animate={{ top: ["-100%", "200%"] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"
                        />
                    </div>

                    {/* Industrial Reticles */}
                    <div className="absolute top-16 left-16 md:top-24 md:left-24 h-16 w-16 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute bottom-16 right-16 md:bottom-24 md:right-24 h-16 w-16 border-b-2 border-r-2 border-primary/30 rounded-br-3xl group-hover:scale-110 transition-transform duration-500" />

                    <div className="relative z-10 mt-10 h-full w-full flex flex-col items-center justify-center text-center p-8 md:p-24 space-y-12">
                        {/* Terminal Manifest */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            className="bg-primary/10 border border-primary/20 px-6 py-2 rounded-2xl glass flex items-center gap-3"
                        >
                            <Terminal className="h-4 w-4 text-primary animate-pulse" />
                            <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-primary">Status: Deployment_Handshake_Ready</span>
                        </motion.div>

                        <div className="space-y-6 max-w-5xl">
                            <h2 className="text-4xl md:text-8xl font-[1000] tracking-tighter text-foreground leading-[0.8] uppercase italic text-glow">
                                Scale your <br />
                                <span className="text-primary not-italic text-glow-primary">Intelligence.</span>
                            </h2>
                            <p className="text-lg md:text-2xl text-foreground/30 font-medium max-w-xl mx-auto leading-tight italic tracking-tighter">
                                Transition your outbound engine into the world's first autonomous intelligence protocol. Secure your deployment slot.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-8 pt-4">
                            <Magnetic>
                                <Link href="/register">
                                    <Button
                                        size="lg"
                                        className="h-20 px-14 text-xl font-black rounded-[32px] bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all shadow-[0_30px_60px_rgba(var(--color-primary),0.4)] group/btn relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                                        <span className="relative z-10 uppercase tracking-widest italic">INITIALIZE_CORE</span>
                                        <Zap className="ml-3 h-5 w-5 fill-primary-foreground relative z-10 group-hover:rotate-12 transition-transform" />
                                    </Button>
                                </Link>
                            </Magnetic>

                            <Magnetic>
                                <Link href="/docs">
                                    <Button
                                        variant="outline"
                                        className="h-20 px-10 text-lg font-black rounded-3xl border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all flex items-center gap-4 italic group/doc"
                                    >
                                        <Binary className="h-5 w-5 text-foreground/40 group-hover/doc:text-primary transition-colors" />
                                        <span className="uppercase tracking-[0.1em] text-foreground/40 group-hover/doc:text-foreground">View_Manifest</span>
                                        <ArrowRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                                    </Button>
                                </Link>
                            </Magnetic>
                        </div>

                        {/* Operational Telemetry */}
                        <div className="absolute bottom-16 left-0 right-0 px-24 hidden md:flex justify-between items-center opacity-20">
                            <div className="flex items-center gap-4">
                                <Activity className="h-4 w-4" />
                                <span className="text-[9px] font-mono font-black uppercase tracking-[0.3em]">Network_Load: NOMINAL</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                <span className="text-[9px] font-mono font-black uppercase tracking-[0.3em]">AES_256: SECURE_LINK</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Cpu className="h-4 w-4" />
                                <span className="text-[9px] font-mono font-black uppercase tracking-[0.3em]">Hardware: OPTIMIZED</span>
                            </div>
                        </div>
                    </div>

                    {/* Peripheral Tech Accents */}
                    <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-[0.05] pointer-events-none group-hover:opacity-10 transition-opacity">
                        <Network className="w-64 h-64" />
                    </div>
                </motion.div>

                {/* Vertical Scroll Indicator */}
                <div className="absolute bottom-10 flex flex-col items-center gap-4 opacity-10">
                    <div className="h-12 w-[1px] bg-gradient-to-b from-primary to-transparent" />
                    <span className="text-[8px] font-mono uppercase tracking-[1em] rotate-90 origin-left ml-2">DEP_LOCK</span>
                </div>
            </div>
        </section>
    );
}
