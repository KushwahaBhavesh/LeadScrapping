"use client";

import { Quote } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const testimonials = [
    {
        quote: "The agentic validation layer is a game changer. We've seen a 40% increase in outbound response rates since switching.",
        author: "Sarah Chen",
        role: "Head of Growth @ Vercel",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
        quote: "Finally, a scraping platform that doesn't require constant selector maintenance. It just works, every single time.",
        author: "Marcus Thorne",
        role: "Data Engineer @ OpenAI",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
    }
];

export function Testimonials() {
    const gridRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { left, top } = gridRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    return (
        <section className="py-24 md:py-48 px-4 relative bg-background overflow-hidden">
            {/* Background Chromatic Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-indigo-500/[0.04] rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-purple-500/[0.04] rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24 px-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4 max-w-2xl"
                    >
                        <div className="text-foreground/30 font-black uppercase tracking-[0.4em] text-[11px]">Social Proof</div>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-[1.1]">
                            Loved by the <br />
                            <span className="text-foreground/30 italic">Best in Tech.</span>
                        </h2>
                    </motion.div>
                </div>

                <div
                    ref={gridRef}
                    onMouseMove={handleMouseMove}
                    className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border rounded-[48px] overflow-hidden bg-card shadow-2xl relative"
                >
                    {/* Grid Spotlight */}
                    <motion.div
                        className="pointer-events-none absolute -inset-px z-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                            background: useTransform([mouseX, mouseY], ([x, y]) =>
                                `radial-gradient(600px circle at ${x}px ${y}px, rgba(79,70,229,0.04), transparent 80%)`
                            )
                        }}
                    />

                    {testimonials.map((t, i) => (
                        <TestimonialCard key={i} t={t} i={i} />
                    ))}
                </div>

                {/* Minimalist Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto py-12 px-10 border border-border rounded-[40px] bg-card shadow-xl"
                >
                    {[
                        { label: 'Intelligence Records', value: '450M+' },
                        { label: 'Platform Users', value: '12k+' },
                        { label: 'Data Accuracy', value: '99.9%' },
                        { label: 'API Availability', value: '100%' }
                    ].map((stat, i) => (
                        <div key={i} className="text-center group cursor-default border-r border-border last:border-0 pr-8 last:pr-0">
                            <motion.div
                                whileHover={{ scale: 1.1, color: "#6366f1" }}
                                className="text-4xl font-black text-foreground tracking-tighter transition-colors"
                            >
                                {stat.value}
                            </motion.div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/20 group-hover:text-foreground/40 transition-colors mt-2">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

interface Testimonial {
    quote: string;
    author: string;
    role: string;
    avatar: string;
}

function TestimonialCard({ t, i }: { t: Testimonial; i: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className={cn(
                "p-12 md:p-16 flex flex-col justify-between group hover:bg-muted/30 transition-all duration-700 border-border last:border-0",
                i === 0 ? "md:border-r" : ""
            )}
        >
            <div className="space-y-8 relative">
                <motion.div
                    whileHover={{ rotate: 180, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="h-10 w-10 flex items-center justify-center rounded-xl bg-muted text-foreground/20 group-hover:text-indigo-600 group-hover:bg-indigo-500/10 transition-all duration-500"
                >
                    <Quote className="h-5 w-5" />
                </motion.div>
                <p className="text-3xl text-foreground/80 font-bold italic leading-snug tracking-tight">
                    "{t.quote}"
                </p>
            </div>

            <div className="mt-16 flex items-center gap-6 pt-10 border-t border-border">
                <div className="relative">
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: i * 0.2 + 0.5, type: "spring" }}
                        className="absolute -inset-2 bg-indigo-500/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <motion.img
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        src={t.avatar}
                        alt={t.author}
                        className="h-14 w-14 rounded-2xl bg-muted grayscale group-hover:grayscale-0 transition-all duration-500 shadow-xl relative z-10 border border-border"
                    />
                </div>
                <div>
                    <p className="font-black text-foreground uppercase tracking-tighter text-lg">{t.author}</p>
                    <p className="text-[11px] text-foreground/30 font-black uppercase tracking-[0.2em]">{t.role}</p>
                </div>
            </div>
        </motion.div>
    );
}
