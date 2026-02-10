import { Button } from '@/components/ui/button';

export function CTA() {
    return (
        <section className="py-24 px-4 bg-gray-50/50 dark:bg-gray-900/30">
            <div className="container mx-auto">
                <div className="relative rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground overflow-hidden shadow-2xl">
                    {/* Background Decorative Element */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-[80px]" />

                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="text-display-l font-bold tracking-tight">
                            Ready to accelerate your <br />
                            <span className="text-white/80">pipeline development?</span>
                        </h2>
                        <p className="text-lg text-primary-foreground/80">
                            Join over 500+ teams using LeadScraper AI to automate their
                            outreach and grow their business.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Button
                                size="lg"
                                variant="secondary"
                                className="w-full sm:w-auto px-10 py-7 text-lg font-bold rounded-xl shadow-lg hover:-translate-y-0.5 transition-all text-primary"
                            >
                                Start Today Free
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="w-full sm:w-auto px-10 py-7 text-lg font-bold rounded-xl bg-transparent border-white/20 text-white hover:bg-white/10"
                            >
                                Schedule a Demo
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
