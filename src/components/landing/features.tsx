"use client";

import { useRef, useState } from "react";
import { Database, Shield, Sparkles, Zap, ChartBar, Globe, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { Magnetic } from "../ui/magnetic";

const features = [
    {
        title: "Dynamic Scraping",
        description: "Adaptive selectors that never break, even when sites change.",
        icon: Zap,
        className: "md:col-span-2 bg-neutral-900 text-white dark:bg-zinc-900 dark:text-zinc-100",
        iconBg: "bg-indigo-500 shadow-indigo-500/20",
    },
    {
        title: "Global Proxy",
        description: "Residential nodes in 190+ countries.",
        icon: Globe,
        className: "bg-white border border-black/5 dark:bg-zinc-950 dark:border-white/5 dark:text-zinc-100",
        iconBg: "bg-primary text-primary-foreground",
    },
    {
        title: "Real-time Verification",
        description: "Every lead is checked against live social signals.",
        icon: Shield,
        className: "bg-white border border-black/5 dark:bg-zinc-950 dark:border-white/5 dark:text-zinc-100",
        iconBg: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
    },
    {
        title: "Market Intelligence",
        description: "Aggregate firmographic data and intent signals in one dashboard.",
        icon: ChartBar,
        className: "md:col-span-2 bg-indigo-600 text-white dark:bg-indigo-700 dark:text-indigo-50",
        iconBg: "bg-white dark:bg-zinc-100 text-indigo-600",
    }
];

export function Features() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(1000);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { left, top } = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    return (
        <section id="features" className="py-24 md:py-48 px-4 relative bg-background overflow-hidden grain">
            {/* Background Chromatic Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] -left-[5%] w-[600px] h-[600px] bg-indigo-500/[0.03] rounded-full blur-[140px]" />
                <div className="absolute bottom-[10%] -right-[5%] w-[600px] h-[600px] bg-purple-500/[0.03] rounded-full blur-[140px]" />
            </div>

            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center text-center space-y-4 mb-24 max-w-3xl mx-auto"
                >
                    <div className="text-foreground/30 font-black uppercase tracking-[0.4em] text-[11px]">Industrial Strength</div>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-[1.1] text-glow">
                        Bento Intelligence <br />
                        <span className="text-foreground/30 italic">Built for scale.</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-foreground/50 font-medium leading-relaxed">
                        We've consolidated our entire scraping infrastructure into a unified
                        intelligent platform that powers the world's fastest growing companies.
                    </p>
                </motion.div>

                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[240px] max-w-7xl mx-auto relative"
                >
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} mouseX={mouseX} mouseY={mouseY} parentRef={containerRef} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 flex justify-center"
                >
                    <Magnetic>
                        <Link href="/register">
                            <Button size="lg" className="rounded-full h-16 px-12 font-black gap-2 bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-2xl group">
                                Unlock Full Capability
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </Magnetic>
                </motion.div>
            </div>
        </section>
    );
}

function FeatureCard({ feature, index, mouseX, mouseY, parentRef }: { feature: any, index: number, mouseX: any, mouseY: any, parentRef: any }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        rotateX.set((y - centerY) / 12);
        rotateY.set((centerX - x) / 12);
    };

    const handleMouseLeave = () => {
        rotateX.set(0);
        rotateY.set(0);
    };

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const yTransform = useTransform(scrollYProgress, [0, 1], [30 + index * 15, -30 - index * 15]);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 1.2,
                delay: index * 0.15,
                ease: [0.23, 1, 0.32, 1]
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                y: yTransform,
                transformStyle: "preserve-3d",
            }}
            className={cn(
                "group p-10 rounded-[40px] transition-all duration-500 overflow-hidden relative border border-transparent hover:border-black/5 active:scale-[0.98]",
                feature.className
            )}
        >
            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: useTransform(
                        [mouseX, mouseY],
                        ([x, y]) => {
                            const rect = cardRef.current?.getBoundingClientRect();
                            const parentRect = parentRef.current?.getBoundingClientRect();
                            if (!rect || !parentRect) return "";
                            const localX = (x as number) - (rect.left - parentRect.left);
                            const localY = (y as number) - (rect.top - parentRect.top);
                            return `radial-gradient(400px circle at ${localX}px ${localY}px, ${feature.className.includes('bg-white') ? 'rgba(79,70,229,0.06)' : 'rgba(255,255,255,0.08)'}, transparent 80%)`;
                        }
                    )
                }}
            />

            <div className="relative z-10 h-full flex flex-col justify-between" style={{ transform: "translateZ(50px)" }}>
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 12 }}
                    className={cn(
                        "h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg",
                        feature.iconBg
                    )}
                >
                    <feature.icon className="h-7 w-7" />
                </motion.div>

                <div className="space-y-3">
                    <motion.h3
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                        className="text-3xl font-black tracking-tighter leading-tight"
                    >
                        {feature.title}
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                        className={cn(
                            "text-lg font-medium leading-relaxed opacity-60",
                            feature.className.includes('bg-neutral-900') || feature.className.includes('bg-indigo-600') ? 'text-white/60' : 'text-black/60'
                        )}
                    >
                        {feature.description}
                    </motion.p>
                </div>
            </div>

            {/* Subtle internal scan animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2000ms] pointer-events-none" />
        </motion.div>
    );
}
