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
            {/* Background Parallax & Floating Nodes */}
            <motion.div
                style={{ y: yBg, opacity: opacityVal }}
                className="absolute inset-0 pointer-events-none"
            >
                {/* Data Beams */}
                <div className="absolute top-[30%] left-0 w-full h-[1px] opacity-20">
                    <div className="data-beam" style={{ animationDelay: '0s' }} />
                </div>
                <div className="absolute top-[60%] left-0 w-full h-[1px] opacity-10">
                    <div className="data-beam" style={{ animationDelay: '1.5s' }} />
                </div>
                {/* Orbital Blurs */}
                <div className="absolute top-20 left-[15%] w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[140px] opacity-[0.05]" />
                <div className="absolute bottom-40 right-[15%] w-[500px] h-[500px] bg-purple-500 rounded-full blur-[140px] opacity-[0.05]" />

                {/* Floating "Data Nodes" */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -30, 0],
                            rotate: [0, 10, 0],
                            scale: [1, 1.05, 1]
                        }}
                        transition={{
                            duration: 5 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5
                        }}
                        className={cn(
                            "absolute w-12 h-12 border border-black/5 dark:border-white/5 rounded-2xl bg-background/40 backdrop-blur-sm flex items-center justify-center shadow-sm",
                            i === 0 && "top-[20%] left-[10%]",
                            i === 1 && "top-[40%] right-[12%]",
                            i === 2 && "bottom-[30%] left-[15%]",
                            i === 3 && "top-[15%] right-[20%]",
                            i === 4 && "bottom-[15%] right-[25%]",
                            i === 5 && "top-[60%] left-[8%]"
                        )}
                        style={{
                            translateY: (i + 1) * 20 // Static offset for initial placement
                        }}
                    >
                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-500/30" />
                    </motion.div>
                ))}

                {/* Micro-Noise Texture */}
                <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            </motion.div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col items-center text-center space-y-10">
                    {/* Minimalist Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/5 dark:border-white/5 bg-background shadow-sm animate-fade-in hover:border-black/10 transition-all cursor-default group"
                    >
                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/40">2025 Intelligence Engine</span>
                    </motion.div>

                    {/* Bold Centered Headline */}
                    <div className="space-y-5 max-w-4xl">
                        <h1 className="text-display-xl font-black tracking-tight text-foreground leading-[1.05] text-glow">
                            {["Leads", "found", "by", "AI."].map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: "circOut" }}
                                    className="inline-block mr-[0.2em]"
                                >
                                    {word}
                                </motion.span>
                            ))}
                            <br />
                            <span className="text-foreground/30 italic">
                                {["Validated", "by", "agents."].map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8, delay: 0.8 + i * 0.1, ease: "circOut" }}
                                        className="inline-block mr-[0.2em]"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </span>
                        </h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1.2 }}
                            className="text-xl md:text-2xl text-foreground/50 max-w-3xl mx-auto font-medium leading-relaxed"
                        >
                            The elite intelligence platform for outbound teams. We combine massive web indices with
                            distributed AI agents to find your next $1M in revenue.
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
                                    Start Free Extraction
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </Magnetic>
                        <Magnetic>
                            <Button
                                size="lg"
                                variant="outline"
                                className="w-full sm:min-w-[200px] h-14 text-base font-bold rounded-full border-black/10 dark:border-white/10 bg-background text-foreground hover:bg-muted transition-all active:scale-95"
                            >
                                View Live Demo
                            </Button>
                        </Magnetic>
                    </motion.div>

                    {/* Minimalist Trust Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                        className="w-full max-w-5xl pt-24"
                    >
                        <div className="flex flex-col items-center gap-10">
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-foreground/20">Powering the extraction layers for</span>
                            <Marquee duration={25}>
                                {[
                                    { name: "Vercel", icon: Layers },
                                    { name: "OpenAI", icon: Zap },
                                    { name: "GitHub", icon: Github },
                                    { name: "Slack", icon: Slack },
                                    { name: "Chrome", icon: Chrome },
                                    { name: "Twitter", icon: Twitter },
                                    { name: "LinkedIn", icon: Linkedin }
                                ].map((brand, i) => (
                                    <div key={i} className="flex items-center gap-3 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                                        <brand.icon className="h-6 w-6" />
                                        <span className="text-xl font-black tracking-tighter uppercase">{brand.name}</span>
                                    </div>
                                ))}
                            </Marquee>
                        </div>
                    </motion.div>
                </div>

                {/* Industrial Grid Presentation */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: "circOut" }}
                    className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-black/5 dark:border-white/5 rounded-[32px] overflow-hidden glass shadow-2xl"
                >
                    {[
                        { title: "500M+ Records", desc: "Live index of global B2B profiles, firmographics.", icon: Database },
                        { title: "Agentic Validation", desc: "AI nodes verify leads in real-time.", icon: Shield },
                        { title: "CRM Sync", desc: "Native integrations with HubSpot/Salesforce.", icon: Sparkles }
                    ].map((item, i) => (
                        <div key={i} className={cn(
                            "p-10 transition-all hover:bg-white/5 flex flex-col space-y-5 group cursor-default backdrop-blur-sm",
                            i < 2 ? "md:border-r border-black/5 dark:border-white/5" : ""
                        )}>
                            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-md shadow-black/10">
                                <item.icon className="h-4.5 w-4.5 text-primary-foreground" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-3xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors uppercase ">{item.title}</h3>
                                <p className="text-lg text-foreground/50 font-medium leading-relaxed  tracking-tight">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
