"use client";

import Link from "next/link";
import { Zap, Github, Twitter, Linkedin, Mail, ArrowUpRight, Activity, ShieldCheck, Globe, Database, Box } from "lucide-react";

const footerLinks = [
    {
        title: "Platform Architecture",
        links: ["Global Node Sync", "Extraction Logic", "Entity Indexing", "API Connector"]
    },
    {
        title: "Ecosystem Access",
        links: ["Engineering Blog", "System Status", "Brand Assets", "Careers (Active)"]
    },
    {
        title: "Safety Shield",
        links: ["Data Privacy", "SOC-2 Whitepaper", "Terms of Intelligence", "Human Feedback"]
    }
];

export function Footer() {
    return (
        <footer className="relative pt-32 pb-20 overflow-hidden bg-background">
            <div className="container px-4 mx-auto relative z-10">

                {/* --- THE BRAND MONOLITH --- */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-16 pb-32 border-b border-foreground/[0.04]">
                    <div className="space-y-12 lg:col-span-6">
                        <Link href="/" className="flex items-center gap-4 group">
                            <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-primary shadow-2xl group-hover:rotate-12 transition-all duration-700">
                                <Zap className="h-8 w-8 text-primary-foreground fill-primary-foreground" />
                            </div>
                            <span className="text-4xl font-black tracking-tighter text-foreground ">
                                LeadScraper
                            </span>
                        </Link>

                        <p className="text-3xl font-medium text-foreground/30 max-w-xl leading-[1.1] tracking-tighter italic">
                            The definitive <span className="text-foreground font-black">Architecture</span> for high-velocity outbound teams.
                        </p>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-10">
                        <div className="text-[10px] font-black uppercase tracking-[0.5em] text-foreground/10">Connected Nodes: 1.4k Active</div>
                        <div className="flex gap-4">
                            {[Linkedin, Github, Twitter].map((Icon, i) => (
                                <Link
                                    key={i}
                                    href="#"
                                    className="h-14 w-14 rounded-2xl border border-foreground/[0.03] bg-muted flex items-center justify-center text-foreground/20 hover:text-foreground hover:border-foreground/10 hover:shadow-xl transition-all duration-700"
                                >
                                    <Icon className="h-6 w-6" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- INCREASED TYPOGRAPHY DIRECTORY --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 py-24 mb-12">
                    {footerLinks.map((col, i) => (
                        <div key={i} className="space-y-10">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-indigo-500/20" />
                                <h4 className="text-[12px] font-black uppercase tracking-[0.4em] text-foreground/30">{col.title}</h4>
                            </div>
                            <ul className="space-y-5">
                                {col.links.map((link, j) => (
                                    <li key={j}>
                                        <Link href="#" className="group flex justify-between items-center text-foreground/50 hover:text-foreground font-extrabold text-[16px] uppercase tracking-wider transition-all">
                                            <span>{link}</span>
                                            <ArrowUpRight className="h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Integrated Operational Cards */}
                    <div className="lg:border-l border-foreground/[0.04] lg:pl-16 space-y-10">
                        <div className="flex items-center gap-3">
                            <Activity className="h-4 w-4 text-foreground/20" />
                            <h4 className="text-[12px] font-black uppercase tracking-[0.4em] text-foreground/30">System Integrity</h4>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-muted border border-foreground/[0.02] hover:border-foreground/5 transition-colors group">
                                <Globe className="h-4 w-4 text-emerald-500 animate-pulse" />
                                <span className="text-[11px] font-bold uppercase tracking-widest text-foreground/40 group-hover:text-foreground transition-colors">Network: 99.98%</span>
                            </div>
                            <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-muted border border-foreground/[0.02] hover:border-foreground/5 transition-colors group">
                                <Database className="h-4 w-4 text-indigo-500" />
                                <span className="text-[11px] font-bold uppercase tracking-widest text-foreground/40 group-hover:text-foreground transition-colors">Cloud: 500M+ Records</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- FOOTNOTE --- */}
                <div className="pt-16 border-t border-foreground/[0.04] flex flex-col md:flex-row justify-between gap-10">
                    <div className="flex flex-wrap items-center gap-8 text-[11px] font-black text-foreground/20 uppercase tracking-[0.4em]">
                        <span>© {new Date().getFullYear()} LeadScraper</span>
                        <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">Safety</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">Manifesto</Link>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="text-[10px] font-black text-foreground/10 tracking-[0.2em] uppercase">Architecture v5.29.X</div>
                        <Box className="h-5 w-5 text-foreground/5" />
                    </div>
                </div>
            </div>

            <div className="absolute top-0 right-0 p-24 text-[260px] font-black text-foreground/[0.01] pointer-events-none select-none tracking-tighter leading-none">
                PROTOCOL
            </div>
        </footer>
    );
}
