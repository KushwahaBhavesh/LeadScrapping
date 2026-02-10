import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MailCheck, ArrowRight } from 'lucide-react';

export function Newsletter() {
    return (
        <section className="py-16 px-4 overflow-hidden relative bg-white">
            <div className="container mx-auto">
                <div className="max-w-6xl mx-auto rounded-[40px] border border-black/5 bg-neutral-50 p-12 md:p-20 relative overflow-hidden text-center group">
                    {/* Minimalist Design: Soft background and bold text */}
                    <div className="relative z-10 flex flex-col items-center space-y-8">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white shadow-2xl mb-2 group-hover:rotate-3 transition-transform duration-500">
                            <MailCheck className="h-6 w-6" />
                        </div>

                        <div className="space-y-4 max-w-xl">
                            <h2 className="text-5xl md:text-6xl font-black tracking-tight text-black leading-[1.1]">
                                Engineering <br />
                                <span className="text-black/30 italic">Growth at Scale.</span>
                            </h2>
                            <p className="text-black/50 text-xl font-medium leading-relaxed">
                                Join 5,000+ engineers and growth specialists getting advanced
                                scraping playbooks every Tuesday morning.
                            </p>
                        </div>

                        <form className="flex flex-col sm:flex-row gap-2 w-full max-w-lg mx-auto pt-4">
                            <Input
                                type="email"
                                placeholder="work@company.com"
                                required
                                className="h-12 px-6 bg-white border-black/5 rounded-xl focus:ring-4 focus:ring-black/5 focus:bg-white transition-all text-base text-black placeholder:text-black/20"
                            />
                            <Button size="lg" className="h-12 px-10 text-base font-black rounded-xl bg-black text-white hover:bg-neutral-800 transition-all shadow-xl group/btn">
                                Subscribe
                                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                        </form>

                        <div className="flex items-center gap-8 pt-8">
                            {['Stripe', 'Vercel', 'OpenAI'].map((item) => (
                                <span key={item} className="text-[11px] font-black uppercase tracking-[0.4em] text-black/20 italic">{item}</span>
                            ))}
                        </div>
                    </div>

                    {/* Massive background watermark */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-[240px] font-black text-black/[0.02] uppercase pointer-events-none select-none tracking-tighter">
                        NEWS
                    </div>
                </div>
            </div>
        </section>
    );
}
