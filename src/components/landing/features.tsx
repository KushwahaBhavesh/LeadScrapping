import { Button } from '@/components/ui/button';
import { Bot, Database, Globe, LineChart, Shield, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

const features = [
    {
        title: 'Intelligent Scraping',
        description: 'Our AI agents understand context. They don\'t just extract text; they identify roles, intentions, and sentiment.',
        icon: Bot,
        color: 'bg-blue-500',
    },
    {
        title: 'Global Database',
        description: 'Access a massive, multi-source index of global business profiles, tech stacks, and company finances.',
        icon: Database,
        color: 'bg-indigo-500',
    },
    {
        title: 'Real-time Verification',
        description: 'Stop wasting credits on dead emails. We verify every contact at the point of extraction.',
        icon: Shield,
        color: 'bg-emerald-500',
    },
    {
        title: 'ICP Modeling',
        description: 'Define your Ideal Customer Profile and let our AI hunt for companies that match your best customers.',
        icon: Zap,
        color: 'bg-amber-500',
    },
    {
        title: 'Deep Market Insights',
        description: 'Track competitor hires, technology changes, and funding rounds to find the perfect time to reach out.',
        icon: LineChart,
        color: 'bg-rose-500',
    },
    {
        title: 'Global Proxy Network',
        description: 'Scrape any site without being blocked. Residential proxies ensure 99.9% uptime and anonymity.',
        icon: Globe,
        color: 'bg-violet-500',
    },
];

export function Features() {
    return (
        <section id="features" className="py-24 md:py-32 px-4 relative">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20 px-4">
                    <div className="space-y-4 max-w-2xl">
                        <div className="text-primary font-black uppercase tracking-widest text-sm">Capabilities</div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white leading-[1.1]">
                            Engineered for <br />
                            <span className="text-primary">Extreme Performance.</span>
                        </h2>
                        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium max-w-lg">
                            We've rebuilt lead generation from the ground up using state-of-the-art
                            AI agents and distributed infrastructure.
                        </p>
                    </div>

                    <Link href="/register">
                        <Button size="lg" className="rounded-2xl h-14 px-8 font-bold gap-2 shadow-xl shadow-primary/20">
                            Explore all Features
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-[40px] border border-white/20 dark:border-gray-800/50 bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl shadow-xl hover:shadow-2xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300"
                        >
                            <div className={`h-16 w-16 rounded-3xl ${feature.color} bg-opacity-10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                <feature.icon className={`h-8 w-8 text-gray-900 dark:text-white`} />
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                {feature.title}
                            </h3>

                            <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-8">
                                {feature.description}
                            </p>

                            <ul className="space-y-3">
                                {['99.9% Accuracy', 'Instant Extract', 'Unlimited API'].map((text, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm font-bold text-gray-400">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        {text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

import Link from 'next/link';
