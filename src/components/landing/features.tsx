import { Button } from '@/components/ui/button';
import { Bot, Database, Globe, LineChart, Shield, Zap, ArrowRight } from 'lucide-react';

const features = [
    {
        title: 'Intelligent Scraping',
        description:
            'Our AI agents navigate complex websites, bypassing anti-bot protections to extract the data you need.',
        icon: Globe,
    },
    {
        title: 'AI Qualification',
        description:
            'Automatically score and qualify leads based on your ideal customer profile using advanced LLMs.',
        icon: Bot,
    },
    {
        title: 'Data Enrichment',
        description:
            'Enrich extracted emails with phone numbers, LinkedIn profiles, and company details instantly.',
        icon: Database,
    },
    {
        title: 'Real-time Analytics',
        description:
            'Track your campaign performance with detailed dashboards and exportable reports.',
        icon: LineChart,
    },
    {
        title: 'Enterprise Security',
        description:
            'SOC2 compliant infrastructure with encrypted data storage and role-based access control.',
        icon: Shield,
    },
    {
        title: 'Lightning Fast',
        description:
            'Parallel processing architecture ensures you get thousands of leads in minutes, not days.',
        icon: Zap,
    },
];

export function Features() {
    return (
        <section id="features" className="bg-gray-50 dark:bg-gray-900/50 py-24 md:py-32">
            <div className="container px-4 mx-auto">
                <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
                    <h2 className="text-display-l text-gray-900 dark:text-white">
                        Everything you need to <br />
                        <span className="text-primary">scale your growth</span>
                    </h2>
                    <p className="text-paragraph-large text-gray-600 dark:text-gray-400">
                        Our platform combines robust scraping with intelligent AI to deliver
                        high-quality leads directly to your CRM.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="group p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Icon Container */}
                            <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <feature.icon className="h-6 w-6 text-primary" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                                {feature.description}
                            </p>

                            {/* CTA Link - Tertiary style */}
                            <div className="mt-6">
                                <Button
                                    variant="link"
                                    className="p-0 h-auto text-primary font-semibold hover:no-underline flex items-center group/link text-sm"
                                >
                                    Learn more
                                    <ArrowRight className="ml-1.5 h-4 w-4 transform group-hover/link:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
