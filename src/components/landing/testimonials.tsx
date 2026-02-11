"use client";

import { Quote, CheckCircle2, ShieldCheck, Activity, Server, Database } from "lucide-react";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
}

const testimonials = [
    {
        quote: "We replaced our entire manual prospecting team with LeadScraper. The automated enrichment finds valid emails for 85% of our targets.",
        author: "Sarah_Chen",
        role: "Head of Sales @ TechFlow",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        status: "VERIFIED"
    },
    {
        quote: "The ability to scrape LinkedIn and Maps simultaneously without getting blocked is a game changer. We scaled our outreach by 10x.",
        author: "Marcus_Thorne",
        role: "Growth Lead @ Nexus",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
        status: "SCALING"
    },
    {
        quote: "Data quality is incredible. We used to get 30% bounce rates with other tools. With LeadScraper, it's consistently under 2%.",
        author: "Elena_Vance",
        role: "Marketing Director @ Solstice",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
        status: "ROI_POSITIVE"
    },
    {
        quote: "The API integration allowed us to build a custom real-time enrichment pipeline directly into our own dashboard.",
        author: "David_Hockney",
        role: "CTO @ DataStream",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        status: "INTEGRATED"
    }
];

export function Testimonials() {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
    const xMobile = "0%";

    return (
        <section ref={targetRef} className="relative md:h-[300vh] h-auto bg-background py-20 md:py-0">
            <div className="md:sticky md:top-0 md:flex md:h-screen items-center md:overflow-hidden overflow-visible">
                {/* Background Parallax HUD */}
                <motion.div
                    style={{ x: useTransform(scrollYProgress, [0, 1], [100, -200]) }}
                    className="absolute top-[20%] left-[-5%] opacity-[0.03] pointer-events-none whitespace-nowrap font-mono text-[20vw] font-black uppercase tracking-tighter italic"
                >
                    Social_Consensus_Protocol
                </motion.div>

                <div className="container mx-auto px-8 relative z-10">
                    <div className="flex flex-col items-center text-center space-y-6 mb-20">
                        <div className="flex items-center gap-4 text-primary/40 font-black uppercase tracking-[0.5em] text-[10px]">
                            <span className="h-px w-8 bg-primary/20" />
                            Growth_Engine_Feedback
                            <span className="h-px w-8 bg-primary/20" />
                        </div>
                        <h2 className="text-display-l md:text-7xl font-black tracking-tight text-foreground leading-[1.1] text-glow uppercase italic">
                            Validated Growth <br />
                            <span className="text-foreground/20">At_Scale.</span>
                        </h2>
                    </div>

                    <motion.div
                        style={{ x: isDesktop ? x : xMobile }}
                        className="flex flex-col md:flex-row gap-8 px-4 md:px-0"
                    >
                        {testimonials.map((t, i) => (
                            <TestimonialCard key={i} t={t} />
                        ))}
                    </motion.div>

                    {/* Technical Stats Dashboard */}
                    <div className="my-10 md:my-20 max-w-6xl mx-auto p-8 md:p-14 border border-white/5 bg-white/[0.02] rounded-[32px] md:rounded-[48px] backdrop-blur-3xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative z-10">
                            {[
                                { label: 'Intelligence_Records', value: '450M+', icon: Database },
                                { label: 'Platform_Endpoints', value: '12k+', icon: Server },
                                { label: 'Signal_Accuracy', value: '99.9%', icon: ShieldCheck },
                                { label: 'API_Latency', value: '110ms', icon: Activity }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col items-center sm:items-start space-y-4 group/stat cursor-default">
                                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover/stat:scale-110 group-hover/stat:rotate-12 transition-all">
                                        <stat.icon className="h-4 w-4" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-4xl font-black text-foreground tracking-tighter group-hover/stat:text-glow transition-all">
                                            {stat.value}
                                        </div>
                                        <div className="text-[9px] font-mono font-black uppercase tracking-[0.3em] text-foreground/20 group-hover/stat:text-primary transition-colors">
                                            {stat.label}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

interface Testimonial {
    quote: string;
    author: string;
    role: string;
    avatar: string;
    status: string;
}

function TestimonialCard({ t }: { t: Testimonial }) {
    return (
        <div
            className="flex-shrink-0 w-full md:w-[450px] group relative p-8 md:p-12 bg-white/[0.03] border border-white/5 rounded-[32px] md:rounded-[48px] backdrop-blur-2xl shadow-xl overflow-hidden"
        >
            <div className="absolute top-6 left-8 flex items-center gap-3">
                <div className="flex gap-1">
                    {[1, 2, 3].map((dot) => (
                        <div key={dot} className="h-1 w-1 rounded-full bg-primary/30" />
                    ))}
                </div>
                <div className="text-[8px] font-mono text-primary/40 uppercase tracking-widest">SIGNAL_VERIFICATION_COMPLETE</div>
            </div>

            <div className="relative z-10 flex flex-col justify-between h-full pt-8">
                <div className="space-y-8">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-2xl relative group-hover:rotate-[360deg] transition-transform duration-1000">
                        <Quote className="h-6 w-6" />
                    </div>
                    <p className="text-2xl font-bold italic leading-snug tracking-tight text-foreground/80">
                        "{t.quote}"
                    </p>
                </div>

                <div className="mt-16 flex items-center justify-between pt-10 border-t border-white/5">
                    <div className="flex items-center gap-5">
                        <Image
                            src={t.avatar}
                            alt={t.author}
                            width={56}
                            height={56}
                            className="h-14 w-14 rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/10 shadow-lg"
                        />
                        <div>
                            <p className="font-black text-foreground uppercase tracking-tighter text-xl italic">{t.author}</p>
                            <p className="text-[10px] text-foreground/30 font-black uppercase tracking-[0.2em]">{t.role}</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
                            <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                            <span className="text-[8px] font-mono text-emerald-500 font-bold tracking-widest uppercase">{t.status}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Corner Bracket Accents */}
            <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-primary/20 rounded-tr-[48px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-primary/20 rounded-bl-[48px] pointer-events-none" />
        </div>
    );
}
