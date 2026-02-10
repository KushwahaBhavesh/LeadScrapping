import { Quote, Star } from 'lucide-react';

const testimonials = [
    {
        quote: "LeadScraper AI has completely transformed our outbound process. We went from finding 50 leads a week to 500+ high-quality contacts daily.",
        author: "Sarah Jenkins",
        role: "Head of Growth @ TechFlow",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
        quote: "The AI filtering is a game changer. It understands our ICP better than our junior SDRs did. The ROI was immediate and substantial.",
        author: "David Chen",
        role: "Founder @ ScaleUp Labs",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
    },
    {
        quote: "Finally a tool that doesn't just scrape raw data but provides actionable intelligence. The CRM integration works like a charm.",
        author: "Marcus Thorne",
        role: "VP Sales @ CloudNative",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
    }
];

export function Testimonials() {
    return (
        <section className="py-24 px-4 relative overflow-hidden">
            <div className="container mx-auto">
                <div className="text-center space-y-4 mb-20">
                    <div className="flex justify-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                        ))}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white">
                        Loved by Growth Teams.
                    </h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto">
                        Don't just take our word for it. Join the thousands of companies scaling
                        their revenue with LeadScraper AI.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className="p-10 rounded-[48px] border border-white/20 dark:border-gray-800/50 bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl shadow-xl flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="relative">
                                <Quote className="absolute -top-4 -left-4 h-12 w-12 text-primary/10 group-hover:text-primary/20 transition-colors" />
                                <p className="text-xl text-gray-700 dark:text-gray-300 font-medium italic leading-relaxed relative z-10">
                                    "{t.quote}"
                                </p>
                            </div>

                            <div className="mt-12 flex items-center gap-4 border-t border-gray-100 dark:border-gray-800 pt-8">
                                <img src={t.avatar} alt={t.author} className="h-14 w-14 rounded-2xl bg-gray-100 dark:bg-gray-800" />
                                <div>
                                    <p className="font-black text-gray-900 dark:text-white uppercase tracking-tight">{t.author}</p>
                                    <p className="text-sm text-gray-500 font-bold">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats row */}
                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto border-t border-white/20 dark:border-gray-800/50 pt-16">
                    {[
                        { label: 'Verified Leads', value: '450M+' },
                        { label: 'Active Users', value: '12k+' },
                        { label: 'Data Accuracy', value: '99.9%' },
                        { label: 'API Uptime', value: '100%' }
                    ].map((stat, i) => (
                        <div key={i} className="text-center space-y-1">
                            <div className="text-3xl font-black text-primary tracking-tighter">{stat.value}</div>
                            <div className="text-xs font-black uppercase tracking-widest text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
