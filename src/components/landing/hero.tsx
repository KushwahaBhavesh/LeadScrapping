import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Globe, Shield, Database } from 'lucide-react';

export function Hero() {
    return (
        <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col items-center text-center space-y-10">
                    {/* Floating Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-md animate-fade-in shadow-xl shadow-primary/5 hover:bg-primary/10 transition-colors cursor-default">
                        <div className="relative h-2 w-2">
                            <span className="absolute inset-0 rounded-full bg-primary animate-ping" />
                            <span className="relative block h-2 w-2 rounded-full bg-primary" />
                        </div>
                        <span className="text-sm font-bold tracking-tight text-primary uppercase">v2.0: AI-Native Lead Generation</span>
                    </div>

                    {/* Headline */}
                    <div className="space-y-4 max-w-4xl">
                        <h1 className="text-display-xl font-black tracking-tighter text-gray-900 dark:text-white leading-[0.9] sm:leading-[1.1]">
                            Automate Your <br />
                            <span className="bg-gradient-to-r from-primary via-blue-400 to-indigo-500 bg-clip-text text-transparent">Pipeline with AI</span>
                        </h1>
                        <p className="text-paragraph-large text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium">
                            The world's first AI-agent lead scraper that doesn't just find emails,
                            but qualifies them in real-time. Scale your outreach from 0 to 10k monthly leads.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                        <Link href="/register" className="w-full sm:w-auto">
                            <Button
                                size="lg"
                                className="w-full sm:min-w-[200px] h-16 text-lg font-black rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 active:scale-95"
                            >
                                Get Started Free
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-full sm:min-w-[200px] h-16 text-lg font-bold rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 backdrop-blur-xl hover:bg-white dark:hover:bg-gray-900 transition-all active:scale-95"
                        >
                            <Globe className="mr-2 h-5 w-5 text-primary" />
                            Read Docs
                        </Button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="pt-12 flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {['Microsoft', 'Google', 'Amazon', 'Meta', 'Netflix'].map((company) => (
                            <span key={company} className="text-xl font-black text-gray-500 tracking-tighter lowercase">{company}</span>
                        ))}
                    </div>
                </div>

                {/* Hero Feature Grid */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {[
                        { icon: Database, title: "500M+ Records", desc: "Live-synced database of global B2B profiles." },
                        { icon: Shield, title: "GDPR Compliant", desc: "Built with privacy-first scraping algorithms." },
                        { icon: Zap, title: "AI Filtering", desc: "Only pay for leads that match your ICP." }
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className="p-8 rounded-[32px] border border-white/20 dark:border-gray-800/50 bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl shadow-xl hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all group"
                        >
                            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:rotate-3 transition-all duration-300">
                                <feature.icon className="h-6 w-6 text-primary group-hover:text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
