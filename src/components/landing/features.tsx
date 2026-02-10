import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Bot, Database, Globe, LineChart, Zap, ArrowRight } from 'lucide-react';

const features = [
    {
        title: 'Intelligent Agentic Scraping',
        description: 'Our agents understand context. They don\'t just extract text; they identify roles, sentiment, and latent intent in real-time.',
        icon: Bot,
        className: 'md:col-span-2 md:row-span-2 bg-neutral-900 text-white',
        iconBg: 'bg-white/10 text-white',
    },
    {
        title: 'Social Intel',
        description: 'Track competitor hires and funding announcements.',
        icon: LineChart,
        className: 'md:col-span-1 md:row-span-1 bg-white border border-black/5',
        iconBg: 'bg-black text-white',
    },
    {
        title: 'Unified Lead Index',
        description: 'Access a massive, live-synced global business database.',
        icon: Database,
        className: 'md:col-span-1 md:row-span-1 bg-neutral-50 border border-black/5',
        iconBg: 'bg-indigo-600 text-white',
    },
    {
        title: 'Stealth Infrastructure',
        description: 'Residential proxy networks ensure 99.9% uptime. Scrape deep websites without detection.',
        icon: Globe,
        className: 'md:col-span-1 md:row-span-1 bg-white border border-black/5',
        iconBg: 'bg-black text-white',
    },
    {
        title: 'Autonomous Scale',
        description: 'Define your ICP once and let our agents run 24/7, fueling your CRM.',
        icon: Zap,
        className: 'md:col-span-2 md:row-span-1 bg-indigo-50 border border-indigo-100',
        iconBg: 'bg-indigo-600 text-white',
    },
];

export function Features() {
    return (
        <section id="features" className="py-16 md:py-32 px-4 relative bg-white">
            <div className="container mx-auto">
                <div className="flex flex-col items-center text-center space-y-4 mb-20 max-w-3xl mx-auto">
                    <div className="text-black/30 font-black uppercase tracking-[0.4em] text-[11px]">Technical Excellence</div>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tight text-black leading-[1.1]">
                        Bento Intelligence <br />
                        <span className="text-black/30 italic">Built for scale.</span>
                    </h2>
                    <p className="text-xl text-black/50 font-medium leading-relaxed">
                        We've consolidated our entire scraping infrastructure into a unified
                        intelligent platform that powers the world's fastest growing companies.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 auto-rows-[200px] max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
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
                                        feature.className.includes('bg-neutral-900') ? 'text-white/60' : 'text-black/60'
                                    )}>
                                        {feature.description}
                                    </p>
                                </div>
                            </div>

                            {/* Decorative element for the main card */}
                            {feature.className.includes('md:col-span-2') && (
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <Link href="/register">
                        <Button size="lg" className="rounded-full h-14 px-10 font-black gap-2 bg-black text-white hover:bg-neutral-800 transition-all shadow-xl">
                            Unlock Full Capability
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
