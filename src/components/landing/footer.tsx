import Link from 'next/link';
import { Zap, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="relative pt-32 pb-20 overflow-hidden bg-white border-t border-black/5">
            <div className="container px-4 mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-20 pb-24 border-b border-black/5">
                    <div className="lg:col-span-2 space-y-12">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black shadow-xl group-hover:rotate-6 transition-transform">
                                <Zap className="h-7 w-7 text-white fill-white" />
                            </div>
                            <span className="text-3xl font-black tracking-tighter text-black uppercase italic">
                                LeadScraper
                            </span>
                        </Link>
                        <p className="text-xl text-black/40 font-medium max-w-sm leading-relaxed italic">
                            The definitive platform for autonomous lead-gen intelligence.
                            Built for teams that scale at breakneck speed.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Twitter, href: '#' },
                                { icon: Linkedin, href: '#' },
                                { icon: Github, href: '#' },
                                { icon: Mail, href: '#' }
                            ].map((social, i) => (
                                <Link
                                    key={i}
                                    href={social.href}
                                    className="h-14 w-14 rounded-full border border-black/5 bg-neutral-50 flex items-center justify-center text-black/40 hover:text-black hover:border-black/20 hover:bg-neutral-100 transition-all font-black"
                                >
                                    <social.icon className="h-6 w-6" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 mb-12">Architecture</h4>
                        <ul className="space-y-6">
                            {['Global Index', 'Agentic Sync', 'ICP Matching', 'API Node', 'Verification'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-black/60 hover:text-black font-black text-[11px] transition-colors uppercase tracking-[0.2em]">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 mb-12">Ecosystem</h4>
                        <ul className="space-y-6">
                            {['Technical Docs', 'API Spec', 'System Status', 'Help Center', 'Security'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-black/60 hover:text-black font-black text-[11px] transition-colors uppercase tracking-[0.2em]">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 mb-12">The Company</h4>
                        <ul className="space-y-6">
                            {['About Us', 'Careers (Hiring)', 'Privacy Policy', 'Terms of Service', 'Manifesto'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-black/60 hover:text-black font-black text-[11px] transition-colors uppercase tracking-[0.2em]">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] font-black text-black/20 uppercase tracking-[0.5em]">
                        © {new Date().getFullYear()} LeadScraper AI. All rights reserved. Precision Engineering.
                    </p>
                    <div className="flex items-center gap-3 px-6 py-2 rounded-full border border-black/5 bg-neutral-50">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-black/40">Network Operational</span>
                    </div>
                </div>
            </div>

            {/* Minimalist Watermark */}
            <div className="absolute top-0 right-0 p-24 text-[200px] font-black text-black/[0.01] pointer-events-none select-none tracking-tighter leading-none">
                LS
            </div>
        </footer>
    );
}
