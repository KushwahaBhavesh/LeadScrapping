"use client";

import { useRef } from "react";
import { Database, Shield, Sparkles, Zap, ChartBar, Globe, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const features = [
    {
        title: "Dynamic Scraping",
        description: "Adaptive selectors that never break, even when sites change.",
        icon: Zap,
        className: "md:col-span-2 bg-neutral-900 text-white",
        iconBg: "bg-indigo-500",
    },
    {
        title: "Global Proxy",
        description: "Residential nodes in 190+ countries.",
        icon: Globe,
        className: "bg-white border border-black/5",
        iconBg: "bg-black text-white",
    },
    {
        title: "Real-time Verification",
        description: "Every lead is checked against live social signals.",
        icon: Shield,
        className: "bg-white border border-black/5",
        iconBg: "bg-indigo-100 text-indigo-600",
    },
    {
        title: "Market Intelligence",
        description: "Aggregate firmographic data and intent signals in one dashboard.",
        icon: ChartBar,
        className: "md:col-span-2 bg-indigo-600 text-white",
        iconBg: "bg-white text-indigo-600",
    }
];

export function Features() {
    return (
        <section id="features" className="py-16 md:py-32 px-4 relative bg-white overflow-hidden">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center text-center space-y-4 mb-20 max-w-3xl mx-auto"
                >
                    <div className="text-black/30 font-black uppercase tracking-[0.4em] text-[11px]">Technical Excellence</div>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tight text-black leading-[1.1]">
                        Bento Intelligence <br />
                        <span className="text-black/30 italic">Built for scale.</span>
                    </h2>
                    <p className="text-xl text-black/50 font-medium leading-relaxed">
                        We've consolidated our entire scraping infrastructure into a unified
                        intelligent platform that powers the world's fastest growing companies.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-[200px] max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className={cn(
                                "group p-8 rounded-[32px] transition-all duration-500 overflow-hidden relative",
                                feature.className
                            )}
                        >
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className={cn(
                                    "h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110",
                                    feature.iconBg
                                )}>
                                    <feature.icon className="h-5 w-5" />
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-3xl font-black tracking-tighter leading-tight">
                                        {feature.title}
                                    </h3>
                                    <p className={cn(
                                        "text-lg font-medium leading-relaxed opacity-60",
                                        feature.className.includes('bg-neutral-900') || feature.className.includes('bg-indigo-600') ? 'text-white/60' : 'text-black/60'
                                    )}>
                                        {feature.description}
                                    </p>
                                </div>
                            </div>

                            {/* Decorative element for the main card */}
                            {feature.className.includes('md:col-span-2') && (
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            )}
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 flex justify-center"
                >
                    <Link href="/register">
                        <Button size="lg" className="rounded-full h-14 px-10 font-black gap-2 bg-black text-white hover:bg-neutral-800 transition-all shadow-xl group">
                            Unlock Full Capability
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
