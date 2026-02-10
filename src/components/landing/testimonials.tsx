"use client";

import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

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
    return (
        <section className="py-32 px-4 relative bg-[#fcfcfc] overflow-hidden">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24 px-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4 max-w-2xl"
                    >
                        <div className="text-black/30 font-black uppercase tracking-[0.4em] text-[11px]">Proof of Excellence</div>
                        <h2 className="text-5xl md:text-6xl font-black tracking-tight text-black leading-[1.1]">
                            Loved by the <br />
                            <span className="text-black/30 italic">Best in Tech.</span>
                        </h2>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-black/5 rounded-[40px] overflow-hidden bg-white shadow-sm">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                            className="p-8 md:p-10 flex flex-col justify-between group hover:bg-neutral-50 transition-all duration-500 border-black/5 last:border-0 md:border-r"
                        >
                            <div className="space-y-6">
                                <motion.div
                                    whileHover={{ rotate: 180 }}
                                    transition={{ duration: 0.5 }}
                                    className="h-8 w-8 flex items-center justify-center rounded-lg bg-black/5 text-black/20 group-hover:text-black transition-colors"
                                >
                                    <Quote className="h-4 w-4" />
                                </motion.div>
                                <p className="text-2xl text-black/70 font-semibold italic leading-relaxed">
                                    "{t.quote}"
                                </p>
                            </div>

                            <div className="mt-10 flex items-center gap-4 pt-8">
                                <motion.img
                                    whileHover={{ scale: 1.1 }}
                                    src={t.avatar}
                                    alt={t.author}
                                    className="h-10 w-10 rounded-full bg-neutral-100 grayscale group-hover:grayscale-0 transition-all shadow-md"
                                />
                                <div>
                                    <p className="font-black text-black uppercase tracking-tighter text-base">{t.author}</p>
                                    <p className="text-[11px] text-black/30 font-black uppercase tracking-[0.2em]">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Minimalist Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto py-10 px-8 border border-black/5 rounded-full bg-white shadow-sm"
                >
                    {[
                        { label: 'Intelligence Records', value: '450M+' },
                        { label: 'Platform Users', value: '12k+' },
                        { label: 'Data Accuracy', value: '99.9%' },
                        { label: 'API Availability', value: '100%' }
                    ].map((stat, i) => (
                        <div key={i} className="text-center group cursor-default border-r border-black/5 last:border-0">
                            <motion.div
                                whileHover={{ scale: 1.1, color: "#4f46e5" }}
                                className="text-3xl font-black text-black tracking-tight transition-colors"
                            >
                                {stat.value}
                            </motion.div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-black/20 group-hover:text-black/40 transition-colors uppercase mt-1">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
