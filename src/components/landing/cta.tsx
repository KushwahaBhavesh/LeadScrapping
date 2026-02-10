import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

export function CTA() {
    return (
        <section className="py-32 px-4 relative overflow-hidden">
            <div className="container mx-auto">
                <div className="relative z-10 max-w-5xl mx-auto p-12 md:p-24 rounded-[64px] bg-primary overflow-hidden shadow-[0_48px_100px_-24px_rgba(37,99,235,0.4)]">
                    {/* Decorative Mesh */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[100px]" />

                    <div className="relative flex flex-col items-center text-center space-y-10">
                        <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs font-black uppercase tracking-[0.2em]">
                            <Star className="h-3 w-3 fill-white" />
                            Trusted by 10k+ Companies
                            <Star className="h-3 w-3 fill-white" />
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-[1] max-w-3xl">
                            Ready to 10x Your <br />
                            <span className="text-blue-100 italic">Revenue Pipeline?</span>
                        </h2>

                        <p className="text-xl text-blue-50/70 font-medium max-w-2xl leading-relaxed">
                            Join the ranks of high-growth companies using LeadScraper AI to automate
                            their entire outbound discovery process. No more manual searching.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-4">
                            <Link href="/register" className="w-full sm:w-auto">
                                <Button size="lg" className="h-16 px-10 rounded-2xl bg-white text-primary hover:bg-blue-50 font-black text-xl shadow-2xl transition-all active:scale-95 group">
                                    Start Free Trial
                                    <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/docs" className="w-full sm:w-auto">
                                <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 font-bold text-xl transition-all">
                                    Talk to Sales
                                </Button>
                            </Link>
                        </div>

                        <div className="flex items-center gap-8 pt-8 text-blue-100/50 text-sm font-bold uppercase tracking-widest">
                            <span>No Credit Card</span>
                            <div className="h-1 w-1 rounded-full bg-white/20" />
                            <span>14-Day Trial</span>
                            <div className="h-1 w-1 rounded-full bg-white/20" />
                            <span>Cancel Anytime</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
