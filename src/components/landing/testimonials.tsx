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
        <section className="py-32 px-4 relative bg-[#fcfcfc] overflow-hidden">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24 px-4">
                    <div className="space-y-4 max-w-2xl">
                        <div className="text-black/30 font-black uppercase tracking-[0.4em] text-[11px]">Proof of Excellence</div>
                        <h2 className="text-5xl md:text-6xl font-black tracking-tight text-black leading-[1.1]">
                            Loved by the <br />
                            <span className="text-black/30 italic">Best in Tech.</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-black text-black" />
                        ))}
                        <span className="ml-4 text-xs font-black uppercase tracking-widest text-black/40">5.0 / 5.0 Rating</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-black/5 rounded-[40px] overflow-hidden bg-white shadow-xl shadow-black/5">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className="p-8 md:p-10 flex flex-col justify-between group hover:bg-neutral-50 transition-all duration-500 border-black/5 last:border-0 md:border-r"
                        >
                            <div className="space-y-6">
                                <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-black/5 text-black/20 group-hover:text-black transition-colors">
                                    <Quote className="h-4 w-4" />
                                </div>
                                <p className="text-2xl text-black/70 font-semibold italic leading-relaxed">
                                    "{t.quote}"
                                </p>
                            </div>

                            <div className="mt-10 flex items-center gap-4 pt-8">
                                <img src={t.avatar} alt={t.author} className="h-10 w-10 rounded-full bg-neutral-100 grayscale group-hover:grayscale-0 transition-all" />
                                <div>
                                    <p className="font-black text-black uppercase tracking-tighter text-base">{t.author}</p>
                                    <p className="text-[11px] text-black/30 font-black uppercase tracking-[0.2em]">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Minimalist Stats Row */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto py-10 px-8 border border-black/5 rounded-full bg-white shadow-sm">
                    {[
                        { label: 'Intelligence Records', value: '450M+' },
                        { label: 'Platform Users', value: '12k+' },
                        { label: 'Data Accuracy', value: '99.9%' },
                        { label: 'API Availability', value: '100%' }
                    ].map((stat, i) => (
                        <div key={i} className="text-center group cursor-default border-r border-black/5 last:border-0">
                            <div className="text-3xl font-black text-black tracking-tight group-hover:scale-110 transition-transform">{stat.value}</div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-black/20 group-hover:text-black/40 transition-colors uppercase mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
