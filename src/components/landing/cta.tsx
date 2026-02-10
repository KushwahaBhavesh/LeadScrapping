import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Sparkles } from 'lucide-react';

export function CTA() {
    return (
        <section className="py-24 md:py-48 px-4 relative overflow-hidden bg-white">
            <div className="container mx-auto">
                <div className="relative z-10 max-w-7xl mx-auto p-12 md:p-24 rounded-[60px] border border-black/5 bg-black text-center group shadow-[0_64px_120px_-24px_rgba(0,0,0,0.5)]">
                    {/* The CTA is the one high-impact Dark section in the Light theme */}
                    <div className="relative flex flex-col items-center space-y-8">
                        <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 text-[11px] font-black uppercase tracking-[0.4em]">
                            <Sparkles className="h-4 w-4 text-indigo-400 group-hover:rotate-12 transition-transform" />
                            Accelerate Your Pipeline
                        </div>

                        <h2 className="text-5xl md:text-8xl font-black tracking-tight text-white leading-[0.9] max-w-4xl">
                            Ready to 10x Your <br />
                            <span className="text-white/40 italic">Global Scale?</span>
                        </h2>

                        <p className="text-2xl text-white/40 font-medium max-w-xl leading-relaxed">
                            Join the elite teams using autonomous AI to find,
                            qualify, and close leads faster than the competition.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-4">
                            <Link href="/register" className="w-full sm:w-auto">
                                <Button size="lg" className="h-20 px-14 rounded-full bg-white text-black hover:bg-neutral-100 shadow-2xl font-black text-xl transition-all active:scale-95 group/btn">
                                    Get Started
                                    <ArrowRight className="ml-2 h-6 w-6 group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/docs" className="w-full sm:w-auto">
                                <Button size="lg" variant="outline" className="h-20 px-14 rounded-full border-white/10 bg-transparent text-white hover:bg-white/5 font-bold text-xl transition-all">
                                    Talk to Sales
                                </Button>
                            </Link>
                        </div>

                        <div className="flex items-center gap-10 pt-12 text-white/20 text-[11px] font-black uppercase tracking-[0.4em]">
                            <span className="flex items-center gap-2"><Star className="h-3 w-3 fill-white" /> ISO certified</span>
                            <div className="h-1 w-1 rounded-full bg-white/10" />
                            <span className="flex items-center gap-2"><Star className="h-3 w-3 fill-white" /> SOC2 COMPLIANT</span>
                            <div className="h-1 w-1 rounded-full bg-white/10" />
                            <span className="flex items-center gap-2"><Star className="h-3 w-3 fill-white" /> GDPR READY</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
