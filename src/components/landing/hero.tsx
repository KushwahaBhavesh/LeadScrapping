import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, Database, Sparkles, Shield } from 'lucide-react';

export function Hero() {
    return (
        <section className="relative pt-20 pb-28 md:pt-36 md:pb-48 overflow-hidden">
            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col items-center text-center space-y-10">
                    {/* Minimalist Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/5 bg-white shadow-sm animate-fade-in hover:border-black/10 transition-all cursor-default group">
                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="text-[10px] font-bold tracking-[0.1em] text-black/60 uppercase">System v2.5 — Precision Agentic Scraping</span>
                    </div>

                    {/* Bold Centered Headline */}
                    <div className="space-y-5 max-w-4xl">
                        <h1 className="text-display-xl font-black tracking-tight text-black dark:text-white leading-[1.05]">
                            Leads found by AI. <br />
                            <span className="text-black/30 dark:text-white/30 italic">Validated by agents.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-black/50 dark:text-white/50 max-w-3xl mx-auto font-medium leading-relaxed">
                            The elite intelligence platform for outbound teams. We combine massive web indices with
                            distributed AI agents to find your next $1M in revenue.
                        </p>
                    </div>

                    {/* Industrial Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto pt-2">
                        <Link href="/register" className="w-full sm:w-auto">
                            <Button
                                size="lg"
                                className="w-full sm:min-w-[200px] h-14 text-base font-bold rounded-full bg-black text-white hover:bg-neutral-800 transition-all duration-300 active:scale-95 shadow-lg"
                            >
                                Start Free Extraction
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-full sm:min-w-[200px] h-14 text-base font-bold rounded-full border-black/10 bg-white text-black hover:bg-neutral-50 transition-all active:scale-95"
                        >
                            View Live Demo
                        </Button>
                    </div>

                    {/* Minimalist Trust Indicator */}
                    <div className="pt-24 flex flex-col items-center space-y-8">
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-black/20">Powering high-growth engineering teams</p>
                        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-24 opacity-60 grayscale hover:opacity-100 transition-all duration-700">
                            {['OpenAI', 'Anthropic', 'Scale', 'Vercel', 'Stripe'].map((company) => (
                                <span key={company} className="text-3xl font-black text-black dark:text-white tracking-tighter">{company}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Industrial Grid Presentation */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-black/5 rounded-[32px] overflow-hidden bg-white shadow-2xl">
                    {[
                        { title: "500M+ Records", desc: "Live index of global B2B profiles, firmographics.", icon: Database },
                        { title: "Agentic Validation", desc: "AI nodes verify leads in real-time.", icon: Shield },
                        { title: "CRM Sync", desc: "Native integrations with HubSpot/Salesforce.", icon: Sparkles }
                    ].map((item, i) => (
                        <div key={i} className={cn(
                            "p-10 transition-all hover:bg-neutral-50 flex flex-col space-y-5",
                            i < 2 ? "md:border-r border-black/5" : ""
                        )}>
                            <div className="h-9 w-9 rounded-lg bg-black flex items-center justify-center">
                                <item.icon className="h-4.5 w-4.5 text-white" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-3xl font-black tracking-tight text-black">{item.title}</h3>
                                <p className="text-lg text-black/50 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
