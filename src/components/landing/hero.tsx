"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Shield, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Magnetic } from "@/components/ui/magnetic";
import { Marquee } from "@/components/ui/marquee";
import { Github, Twitter, Linkedin, Slack, Chrome, Layers } from "lucide-react";

export function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yBg = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacityVal = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative pt-20 pb-28 md:pt-36 md:pb-48 overflow-hidden bg-background grain">
            {/* Blueprint Grid Layer */}
            <div className="absolute inset-0 blueprint pointer-events-none" />

            {/* Background Parallax & Floating Nodes */}
            <motion.div
                style={{ y: yBg, opacity: opacityVal }}
                className="absolute inset-0 pointer-events-none"
            >
                {/* Liquid Organic Shape */}
                <div className="absolute top-[20%] right-[-10%] w-[800px] h-[800px] bg-primary/5 animate-liquid blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent/5 animate-liquid blur-[120px]" style={{ animationDirection: 'reverse', animationDuration: '12s' }} />

                {/* Data Beams */}
                <div className="absolute top-[30%] left-0 w-full h-[1px] opacity-20">
                    <div className="data-beam" style={{ animationDelay: '0s' }} />
                </div>
                <div className="absolute top-[60%] left-0 w-full h-[1px] opacity-10">
                    <div className="data-beam" style={{ animationDelay: '1.5s' }} />
                </div>

                {/* Orbital Blurs */}
                <div className="absolute top-20 left-[15%] w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[140px] opacity-[0.05]" />
            </motion.div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col items-center text-center space-y-10">
                    {/* Minimalist Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/5 dark:border-white/5 glass shadow-sm animate-fade-in hover:border-black/10 transition-all cursor-default group"
                    >
                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/40">v2.5 // Intelligence_Core</span>
                    </motion.div>

                    {/* Bold Centered Headline */}
                    <div className="space-y-5 max-w-4xl relative">
                        <h1 className="text-display-xl font-black tracking-tight text-foreground leading-[1.05] text-glow">
                            {["Precision", "Leads", "Found", "By", "AI."].map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    transition={{ duration: 1, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                                    className="inline-block mr-[0.2em]"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1.2 }}
                            className="text-xl md:text-2xl text-foreground/50 max-w-3xl mx-auto font-medium leading-relaxed italic tracking-tight"
                        >
                            The high-fidelity extraction engine for hyper-growth teams. We index the web in real-time to find your exact revenue signal.
                        </motion.p>
                    </div>

                    {/* Industrial Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "circOut" }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto pt-2"
                    >
                        <Magnetic>
                            <Link href="/register" className="w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    className="w-full sm:min-w-[200px] h-14 text-base font-bold rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300 active:scale-95 shadow-lg group"
                                >
                                    Start Extraction
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </Magnetic>
                        <Magnetic>
                            <Button
                                size="lg"
                                variant="outline"
                                className="w-full sm:min-w-[200px] h-14 text-base font-bold rounded-full border-black/10 dark:border-white/10 glass text-foreground hover:bg-muted transition-all active:scale-95"
                            >
                                Intelligence Demo
                            </Button>
                        </Magnetic>
                    </motion.div>

                    {/* Trust Marquee (Updated Colors) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                        className="w-full max-w-5xl pt-24"
                    >
                        <div className="flex flex-col items-center gap-10">
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-foreground/20">Powering_The_Extraction_Layers</span>
                            <Marquee duration={30}>
                                {[
                                    { name: "Vercel", icon: Layers },
                                    { name: "OpenAI", icon: Zap },
                                    { name: "GitHub", icon: Github },
                                    { name: "Slack", icon: Slack },
                                    { name: "Chrome", icon: Chrome },
                                    { name: "Twitter", icon: Twitter },
                                    { name: "LinkedIn", icon: Linkedin }
                                ].map((brand, i) => (
                                    <div key={i} className="flex items-center gap-4 grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition-all cursor-default group/brand">
                                        <brand.icon className="h-5 w-5 group-hover:text-primary transition-colors" />
                                        <span className="text-lg font-black tracking-tighter uppercase italic">{brand.name}</span>
                                    </div>
                                ))}
                            </Marquee>
                        </div>
                    </motion.div>
                </div>

                {/* Floating Interface Hub (New Creative Element) */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: "circOut" }}
                    className="mt-32 relative"
                >
                    <div className="absolute inset-x-0 -top-12 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-black/5 dark:border-white/5 rounded-[32px] overflow-hidden glass shadow-2xl">
                        {[
                            { title: "Distributed_Nodes", desc: "Live indexing across 190+ residential geolocations.", icon: Database },
                            { title: "Neural_Verification", desc: "Multi-agent consensus on every data point found.", icon: Shield },
                            { title: "Protocol_Sync", desc: "Native bi-directional flows with your internal stack.", icon: Sparkles }
                        ].map((item, i) => (
                            <div key={i} className={cn(
                                "p-12 transition-all hover:bg-primary/[0.02] flex flex-col space-y-6 group cursor-default backdrop-blur-sm",
                                i < 2 ? "md:border-r border-black/5 dark:border-white/5" : ""
                            )}>
                                <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-primary/20">
                                    <item.icon className="h-5 w-5 text-primary-foreground" />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors uppercase leading-none">{item.title}</h3>
                                    <p className="text-base text-foreground/40 font-medium leading-relaxed tracking-tight">{item.desc}</p>
                                </div>
                                <div className="pt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                                    <span className="text-[10px] font-black uppercase text-primary">View Protocol</span>
                                    <ArrowRight className="h-3 w-3 text-primary" />
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Perspective Mockup (Technical Overlay) */}
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
                </motion.div>
            </div>
        </section>
    );
}
