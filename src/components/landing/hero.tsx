"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Shield, Sparkles, Zap, Network, Binary, Share2, Activity, Server } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useSpring, useMotionValue, MotionValue } from "framer-motion";
import { useRef } from "react";
import { Magnetic } from "@/components/ui/magnetic";
import { Marquee } from "@/components/ui/marquee";
import { Github, Twitter, Linkedin, Slack, Chrome, Layers } from "lucide-react";

function StreamNode({ i, scrollYProgress }: { i: number, scrollYProgress: MotionValue<number> }) {
    const y = useTransform(scrollYProgress, [0, 1], [0, (i + 1) * -50]);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.03, 0.08, 0.03] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
            style={{
                top: `${(i * 13) % 100}%`,
                left: `${(i * 29) % 100}%`,
                y
            }}
            className="absolute w-1 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--color-primary),0.8)]"
        />
    );
}

export function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax Transforms
    const yBg = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacityVal = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const rotateBg = useTransform(scrollYProgress, [0, 1], [0, 20]);

    // Mouse tilt effect for the main hub
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const hubRotateX = useSpring(useTransform(mouseY, [-400, 400], [4, -4]), { stiffness: 100, damping: 30 });
    const hubRotateY = useSpring(useTransform(mouseX, [-400, 400], [-4, 4]), { stiffness: 100, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            mouseX.set(x);
            mouseY.set(y);
        }
    };

    const glowX = useTransform(mouseX, [-400, 400], [0, 20]);
    const glowY = useTransform(mouseY, [-400, 400], [0, 20]);

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative pt-20 pb-28 md:pt-36 md:pb-48 overflow-hidden bg-background grain"
        >
            {/* Blueprint Grid Layer */}
            <div className="absolute inset-0 blueprint pointer-events-none opacity-[0.03] dark:opacity-10" />

            {/* Background Parallax & Floating Elements */}
            <motion.div
                style={{ y: yBg, opacity: opacityVal, rotate: rotateBg }}
                className="absolute inset-0 pointer-events-none z-0"
            >
                {/* Liquid Organic Shapes */}
                <div className="absolute top-[10%] right-[-5%] w-[1000px] h-[800px] bg-primary/5 animate-liquid blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-indigo-500/5 animate-liquid blur-[120px]" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />

                {/* Decorative Tech Icons */}
                <div className="absolute top-[15%] left-[8%] opacity-[0.02]">
                    <Network className="w-64 h-64" />
                </div>
                <div className="absolute bottom-[20%] right-[10%] opacity-[0.02]">
                    <Server className="w-80 h-80" />
                </div>

                {/* Orbital Blurs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-[180px] opacity-[0.04]" />
            </motion.div>

            {/* Dynamic Stream Nodes */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {[...Array(10)].map((_, i) => (
                    <StreamNode key={i} i={i} scrollYProgress={scrollYProgress} />
                ))}
            </div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col items-center text-center space-y-10">
                    {/* Status Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-black/5 dark:border-white/5 glass shadow-xl hover:border-black/10 transition-all cursor-default group"
                    >
                        <div className="relative h-2 w-2">
                            <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                            <div className="relative h-2 w-2 rounded-full bg-primary" />
                        </div>
                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-foreground/40 group-hover:text-foreground transition-colors">
                            v2.5 // Protocol_Active // Extracting_Live
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <div className="space-y-6 max-w-4xl relative">
                        <h1 className="text-display-xl font-black tracking-tight text-foreground leading-[1.05] text-glow">
                            {["Precision", "Leads", "Found", "By", "AI."].map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="inline-block mr-[0.2em] uppercase italic"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </h1>
                        <motion.p
                            initial={{ opacity: 0, filter: "blur(8px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="text-xl md:text-2xl text-foreground/50 max-w-3xl mx-auto font-medium leading-relaxed italic tracking-tight"
                        >
                            The high-fidelity extraction engine for hyper-growth teams. We index the web in real-time to find your exact revenue signal.
                        </motion.p>
                    </div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1, ease: "circOut" }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pt-4"
                    >
                        <Magnetic>
                            <Link href="/register" className="w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    className="w-full sm:min-w-[220px] h-16 text-lg font-black rounded-2xl bg-primary text-primary-foreground hover:scale-105 transition-all duration-300 active:scale-95 shadow-[0_0_30px_rgba(var(--color-primary),0.3)] group uppercase tracking-widest"
                                >
                                    Start_Extraction
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </Magnetic>
                        <Magnetic>
                            <Button
                                size="lg"
                                variant="outline"
                                className="w-full sm:min-w-[220px] h-16 text-lg font-black rounded-2xl border-white/10 glass text-foreground hover:bg-white/5 transition-all active:scale-95 uppercase tracking-widest"
                            >
                                Intelligence_Demo
                            </Button>
                        </Magnetic>
                    </motion.div>

                    {/* Trusted By Labels */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                        className="w-full max-w-5xl pt-24"
                    >
                        <div className="flex flex-col items-center gap-10">
                            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-foreground/20">
                                <span className="h-px w-12 bg-foreground/10" />
                                Powering_The_Extraction_Layers
                                <span className="h-px w-12 bg-foreground/10" />
                            </div>
                            <Marquee duration={35}>
                                {[
                                    { name: "Vercel", icon: Layers },
                                    { name: "OpenAI", icon: Zap },
                                    { name: "GitHub", icon: Github },
                                    { name: "Slack", icon: Slack },
                                    { name: "Chrome", icon: Chrome },
                                    { name: "Twitter", icon: Twitter },
                                    { name: "LinkedIn", icon: Linkedin }
                                ].map((brand, i) => (
                                    <div key={i} className="flex items-center gap-4 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-default group/brand mx-4">
                                        <brand.icon className="h-5 w-5 group-hover:text-primary transition-colors" />
                                        <span className="text-xl font-black tracking-tighter uppercase italic">{brand.name}</span>
                                    </div>
                                ))}
                            </Marquee>
                        </div>
                    </motion.div>
                </div>

                {/* Floating 3D Interface Hub */}
                <motion.div
                    style={{
                        rotateX: hubRotateX,
                        rotateY: hubRotateY,
                        perspective: 1200
                    }}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-32 relative group/hub"
                >
                    {/* Shadow Glow */}
                    <motion.div
                        style={{ x: glowX, y: glowY }}
                        className="absolute -inset-4 bg-primary/10 rounded-[48px] blur-3xl opacity-0 group-hover/hub:opacity-100 transition-opacity duration-1000"
                    />

                    <div className="absolute inset-x-0 -top-12 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/10 rounded-[48px] overflow-hidden glass shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] relative backdrop-blur-3xl">
                        {[
                            { title: "Distributed_Nodes", desc: "Live indexing across 190+ residential geolocations.", icon: Database, accent: "GEO_SYNC" },
                            { title: "Neural_Verification", desc: "Multi-agent consensus on every data point found.", icon: Shield, accent: "AI_CONSENSUS" },
                            { title: "Protocol_Sync", desc: "Native bi-directional flows with your internal stack.", icon: Sparkles, accent: "API_FLOW" }
                        ].map((item, i) => (
                            <div key={i} className={cn(
                                "p-12 md:p-14 lg:p-16 transition-all hover:bg-primary/[0.04] flex flex-col space-y-8 group cursor-default backdrop-blur-sm relative overflow-hidden",
                                i < 2 ? "md:border-r border-white/5" : ""
                            )}>
                                {/* Technical Corner Accents */}
                                <div className="absolute top-4 right-4 font-mono text-[8px] text-foreground/10 uppercase tracking-widest">{item.accent}</div>

                                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl shadow-primary/20">
                                    <item.icon className="h-7 w-7 text-primary-foreground" />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors uppercase leading-none italic">{item.title}</h3>
                                    <p className="text-lg text-foreground/40 font-medium leading-relaxed tracking-tight">{item.desc}</p>
                                </div>
                                <div className="pt-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                                    <span className="text-[11px] font-black uppercase tracking-widest text-primary border-b border-primary/20">View_Protocol</span>
                                    <ArrowRight className="h-4 w-4 text-primary" />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Footer Metadata Cluster */}
                <div className="mt-20 flex flex-wrap justify-between items-center gap-8 opacity-20 px-4">
                    <div className="flex items-center gap-4 text-[9px] font-mono uppercase tracking-[0.4em]">
                        <Binary className="h-4 w-4" />
                        <span>Data_Vault_Secured</span>
                    </div>
                    <div className="flex items-center gap-4 text-[9px] font-mono uppercase tracking-[0.4em]">
                        <Share2 className="h-4 w-4" />
                        <span>Mesh_Network_v4.2</span>
                    </div>
                    <div className="flex items-center gap-4 text-[9px] font-mono uppercase tracking-[0.4em]">
                        <Activity className="h-4 w-4 animate-pulse text-primary" />
                        <span>Live_Stream_Active</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
