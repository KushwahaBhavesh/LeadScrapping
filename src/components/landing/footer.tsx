"use client";

import Link from "next/link";
import { Zap, Github, Twitter, Linkedin, ArrowUpRight, Activity, Globe, Database, Cpu, ShieldCheck, Binary } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const footerLinks = [
    {
        title: "Platform_Arch",
        links: ["Global Node Sync", "Extraction Logic", "Entity Indexing", "API Connector"]
    },
    {
        title: "Ecosystem_Access",
        links: ["Engineering Blog", "System Status", "Brand Assets", "Careers (Active)"]
    },
    {
        title: "Safety_Protocol",
        links: ["Data Privacy", "SOC-2 Whitepaper", "Terms of Intelligence", "Human Feedback"]
    }
];

export function Footer() {
    return (
        <footer className="relative pt-32 pb-16 overflow-hidden bg-background border-t border-white/5 grain">
            {/* Blueprint Grid Layer */}
            <div className="absolute inset-0 blueprint pointer-events-none opacity-[0.02]" />

            <div className="container px-8 mx-auto relative z-10">

                {/* --- THE BRAND MONOLITH --- */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-16 pb-32 border-b border-white/5">
                    <div className="space-y-12 max-w-2xl">
                        <Link href="/" className="flex items-center gap-5 group">
                            <motion.div
                                whileHover={{ rotate: 12, scale: 1.1 }}
                                className="flex h-16 w-16 items-center justify-center rounded-[24px] bg-primary shadow-[0_20px_50px_rgba(var(--color-primary),0.3)] group-hover:shadow-[0_20px_60px_rgba(var(--color-primary),0.5)] transition-all duration-700"
                            >
                                <Zap className="h-9 w-9 text-primary-foreground fill-primary-foreground" />
                            </motion.div>
                            <span className="text-5xl font-black tracking-tighter text-foreground uppercase italic text-glow">
                                LeadScraper
                            </span>
                        </Link>

                        <p className="text-4xl font-black text-foreground/30 leading-[1] tracking-tighter italic uppercase max-w-xl">
                            The definitive <span className="text-foreground">Architecture</span> for high-fidelity outbound intelligence.
                        </p>
                    </div>

                    <div className="flex flex-col items-start lg:items-end gap-12">
                        <div className="flex flex-col items-start lg:items-end gap-2">
                            <div className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-primary/40">CORE_NETWORK_UPLINK</div>
                            <div className="text-[12px] font-mono font-black uppercase tracking-[0.2em] text-foreground/20">STATUS: 1,482 NODES_ACTIVE</div>
                        </div>

                        <div className="flex gap-4">
                            {[Linkedin, Github, Twitter].map((Icon, i) => (
                                <Link
                                    key={i}
                                    href="#"
                                    className="h-16 w-16 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center text-foreground/20 hover:text-primary hover:border-primary/20 hover:bg-primary/5 hover:shadow-2xl transition-all duration-500 group"
                                >
                                    <Icon className="h-7 w-7 transition-transform group-hover:scale-110" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- TYPOGRAPHY DIRECTORY --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 py-24">
                    {footerLinks.map((col, i) => (
                        <div key={i} className="space-y-10">
                            <div className="flex items-center gap-4">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                <h4 className="text-[11px] font-mono font-black uppercase tracking-[0.4em] text-foreground/20">{col.title}</h4>
                            </div>
                            <ul className="space-y-5">
                                {col.links.map((link, j) => (
                                    <li key={j}>
                                        <Link href="#" className="group flex justify-between items-center text-foreground/40 hover:text-foreground font-black text-[15px] uppercase tracking-tighter transition-all italic">
                                            <span>{link}</span>
                                            <ArrowUpRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Operational Status Widgets */}
                    <div className="lg:border-l border-white/5 lg:pl-16 space-y-10">
                        <div className="flex items-center gap-4">
                            <Activity className="h-4 w-4 text-foreground/20" />
                            <h4 className="text-[11px] font-mono font-black uppercase tracking-[0.4em] text-foreground/20">SYSTEM_METRICS</h4>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: "Network_Core", val: "99.99%", icon: Globe, color: "emerald-500" },
                                { label: "Data_Index", val: "452M+", icon: Database, color: "indigo-500" },
                                { label: "Neural_Sync", val: "ACTIVE", icon: Cpu, color: "primary" }
                            ].map((stat, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group cursor-default">
                                    <div className="flex items-center gap-3">
                                        <stat.icon className={cn("h-4 w-4", `text-${stat.color}`)} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground/20 group-hover:text-foreground/40 transition-colors">{stat.label}</span>
                                    </div>
                                    <span className="text-[10px] font-mono font-black text-primary/60">{stat.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- FINAL FOOTNOTE --- */}
                <div className="pt-16 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-10">
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-10 text-[10px] font-mono font-black text-foreground/10 uppercase tracking-[0.4em]">
                        <span>© {new Date().getFullYear()} LEAD_SCRAPER_SYSTEMS</span>
                        {["Privacy_Shield", "Safety_Protocol", "Infrastructure_Manifesto"].map(link => (
                            <Link key={link} href="#" className="hover:text-primary transition-colors">{link}</Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-8 px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="flex items-center gap-3">
                            <Binary className="h-4 w-4 text-primary/20" />
                            <div className="text-[9px] font-mono font-black text-foreground/20 tracking-[0.2em] uppercase">Architecture_v5.29.X // SECURE_ACCESS</div>
                        </div>
                        <div className="h-10 w-[1px] bg-white/5" />
                        <ShieldCheck className="h-5 w-5 text-emerald-500/20" />
                    </div>
                </div>
            </div>

            {/* Massive Background Watermark */}
            <div className="absolute bottom-[-5%] left-[-2%] text-[300px] font-black text-foreground/[0.01] pointer-events-none select-none tracking-tighter leading-none italic uppercase">
                TERMINAL
            </div>
        </footer>
    );
}
