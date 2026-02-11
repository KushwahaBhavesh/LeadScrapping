"use client";

import { useRef } from "react";
import { Shield, Zap, ChartBar, Globe, ArrowRight, Network, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, useMotionValue, useScroll, useTransform, useSpring } from "framer-motion";
import { Magnetic } from "../ui/magnetic";

const features = [
    {
        title: "Adaptive_Scraping",
        description: "Intelligent selectors that adapt to website layout changes automatically. Maintain zero-downtime extractors.",
        icon: Zap,
        className: "md:col-span-2 bg-neutral-900 border-white/5",
        accent: "AUTO_HEAL",
        metrics: "99.9% Uptime"
    },
    {
        title: "Global_Proxies",
        description: "Access local data from 190+ countries with our residential proxy network. Bypass geo-blocks instantly.",
        icon: Globe,
        className: "bg-background border-white/10",
        accent: "RESIDENTIAL",
        metrics: "2.4M IPs"
    },
    {
        title: "Verified_Leads",
        description: "Multi-step verification process to ensure every email and phone number is valid and active before export.",
        icon: Shield,
        className: "bg-background border-white/10",
        accent: "REAL_DATA",
        metrics: "< 1% Bounce"
    },
    {
        title: "CRM_Integration",
        description: "Push verified leads directly to HubSpot, Salesforce, or Pipedrive. Automate your entire outbound workflow.",
        icon: ChartBar,
        className: "md:col-span-2 bg-primary/10 border-primary/20",
        accent: "SYNC_PIPE",
        metrics: "Native APIs"
    }
];

export function Features() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    return (
        <section id="features" ref={containerRef} className="py-24 md:py-48 px-4 relative bg-background overflow-hidden grain">
            {/* Background Parallax Elements */}
            <motion.div style={{ y: y1 }} className="absolute top-[10%] right-[10%] opacity-[0.02] pointer-events-none">
                <Network className="w-96 h-96" />
            </motion.div>
            <motion.div style={{ y: y2 }} className="absolute bottom-[10%] left-[10%] opacity-[0.02] pointer-events-none">
                <Cpu className="w-80 h-80" />
            </motion.div>

            {/* Blueprint Grid Layer */}
            <div className="absolute inset-0 blueprint pointer-events-none opacity-[0.05]" />

            <div className="container mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center space-y-6 mb-32 max-w-4xl mx-auto"
                >
                    <div className="flex items-center gap-4 text-primary/40 font-black uppercase tracking-[0.5em] text-[10px]">
                        <span className="h-px w-8 bg-primary/20" />
                        Industrial_Intelligence_Core
                        <span className="h-px w-8 bg-primary/20" />
                    </div>
                    <h2 className="text-display-l md:text-7xl font-black tracking-tight text-foreground leading-none text-glow uppercase italic">
                        Intelligent <br />
                        <span className="text-foreground/20">Extraction.</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-foreground/40 font-medium leading-relaxed max-w-2xl">
                        A unified infrastructure for high-performance web scraping and data enrichment.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto relative px-4 sm:px-0">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>

                <div className="mt-24 flex flex-col items-center space-y-8">
                    <div className="flex items-center gap-12 opacity-20">
                        {["LATENCY: < 120ms", "UPTIME: 99.99%", "SECURITY: SOC2-II"].map((stat, i) => (
                            <div key={i} className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em]">
                                <div className="h-1 w-1 bg-primary rounded-full" />
                                {stat}
                            </div>
                        ))}
                    </div>

                    <Magnetic>
                        <Link href="/register">
                            <Button size="lg" className="h-18 px-14 text-lg font-black rounded-2xl bg-primary text-white hover:scale-[1.05] transition-all shadow-[0_20px_50px_rgba(var(--color-primary),0.3)] group uppercase tracking-widest active:scale-95">
                                Initialize_Full_Access
                                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </Link>
                    </Magnetic>
                </div>
            </div>
        </section>
    );
}

interface Feature {
    title: string;
    description: string;
    icon: React.ElementType;
    className: string;
    accent: string;
    metrics: string;
}

function FeatureCard({ feature, index }: { feature: Feature, index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth magnetic tilt
    const rotateX = useSpring(useTransform(mouseY, [-200, 200], [5, -5]), { stiffness: 100, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-5, 5]), { stiffness: 100, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (rect) {
            mouseX.set(e.clientX - rect.left - rect.width / 2);
            mouseY.set(e.clientY - rect.top - rect.height / 2);
        }
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const isDark = feature.className.includes('bg-neutral-900');

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                perspective: 1000
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
                "group relative p-8 md:p-10 rounded-[32px] md:rounded-[40px] border overflow-hidden transition-all backdrop-blur-3xl min-h-[280px] flex flex-col justify-between",
                feature.className
            )}
        >
            {/* Technical HUD Overlay */}
            <div className="absolute top-4 left-6 right-6 flex justify-between items-center pointer-events-none">
                <div className="font-mono text-[8px] text-foreground/20 uppercase tracking-widest">{feature.accent}</div>
                <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-1 w-1 rounded-full bg-primary/20 group-hover:bg-primary/50 transition-colors" />
                    ))}
                </div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col justify-between space-y-8">
                <div className="flex justify-between items-start">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className={cn(
                            "h-12 w-12 md:h-14 md:w-14 rounded-2xl flex items-center justify-center shadow-xl transition-all",
                            isDark ? "bg-white/10 text-white" : "bg-primary text-white"
                        )}
                    >
                        <feature.icon className="h-6 w-6 md:h-7 md:w-7" />
                    </motion.div>

                    <div className="text-[9px] font-mono text-primary/40 text-right uppercase tracking-[0.2em] opacity-40 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        Status: Nominal<br />
                        {feature.metrics}
                    </div>
                </div>

                <div className="space-y-3">
                    <h3 className={cn(
                        "text-2xl md:text-3xl font-black tracking-tight uppercase italic text-glow",
                        isDark ? "text-white" : "text-foreground"
                    )}>
                        {feature.title}
                    </h3>
                    <p className={cn(
                        "text-sm md:text-base font-medium leading-relaxed",
                        isDark ? "text-white/40" : "text-foreground/40"
                    )}>
                        {feature.description}
                    </p>
                </div>
            </div>

            {/* Corner Tech Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/20 rounded-tl-[40px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/20 rounded-br-[40px] pointer-events-none" />

            {/* Scan Sweep Effect */}
            <motion.div
                animate={{ top: ["-100%", "200%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none"
            />
        </motion.div>
    );
}
