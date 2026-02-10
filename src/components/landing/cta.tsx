"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function CTA() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const yVal = useTransform(scrollYProgress, [0, 1], [-50, 50]);

    return (
        <section ref={sectionRef} className="py-24 md:py-48 px-4 relative overflow-hidden bg-white">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-7xl mx-auto p-12 md:p-24 rounded-[60px] border border-black/5 bg-black text-center group shadow-[0_64px_120px_-24px_rgba(0,0,0,0.5)]"
                >
                    {/* The CTA is the one high-impact Dark section in the Light theme */}
                    <div className="relative z-10 flex flex-col items-center space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 text-[11px] font-black uppercase tracking-[0.4em]"
                        >
                            <Sparkles className="h-4 w-4 text-indigo-400 group-hover:rotate-12 transition-transform" />
                            Accelerate Your Pipeline
                        </motion.div>

                        <h2 className="text-5xl md:text-8xl font-black tracking-tight text-white leading-[0.9] max-w-4xl">
                            Ready to 10x Your <br />
                            <span className="text-white/40 italic">Global Scale?</span>
                        </h2>

                        <p className="text-2xl text-white/40 font-medium max-w-xl leading-relaxed">
                            Join the elite teams using autonomous AI to find,
                            qualify, and close leads faster than the competition.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-4">
                            <Link href="/register" className="w-full sm:w-auto">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button size="lg" className="h-20 px-14 rounded-full bg-white text-black hover:bg-neutral-100 shadow-[0_0_40px_rgba(255,255,255,0.2)] font-black text-xl transition-all group/btn">
                                        Get Started
                                        <ArrowRight className="ml-2 h-6 w-6 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </motion.div>
                            </Link>
                            <Link href="/docs" className="w-full sm:w-auto">
                                <Button size="lg" variant="outline" className="h-20 px-14 rounded-full border-white/10 bg-transparent text-white hover:bg-white/5 font-bold text-xl transition-all">
                                    Talk to Sales
                                </Button>
                            </Link>
                        </div>

                        <div className="flex items-center gap-10 pt-12 text-white/20 text-[11px] font-black uppercase tracking-[0.4em]">
                            <span className="flex items-center gap-2"><Star className="h-3 w-3 fill-white" /> ISO certified</span>
                            <div className="h-1 w-1 rounded-full bg-white/10" />
                            <span className="flex items-center gap-2"><Star className="h-3 w-3 fill-white" /> SOC2 COMPLIANT</span>
                            <div className="h-1 w-1 rounded-full bg-white/10" />
                            <span className="flex items-center gap-2"><Star className="h-3 w-3 fill-white" /> GDPR READY</span>
                        </div>
                    </div>

                    {/* Industrial Watermark Parallax */}
                    <motion.div
                        style={{ y: yVal }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] md:text-[500px] font-black text-white/[0.03] uppercase pointer-events-none select-none tracking-tighter"
                    >
                        GO?
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
