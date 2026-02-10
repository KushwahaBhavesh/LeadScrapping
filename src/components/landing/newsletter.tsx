import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

export function Newsletter() {
    return (
        <section className="py-24 px-4 overflow-hidden relative">
            <div className="container mx-auto">
                <div className="max-w-4xl mx-auto rounded-[40px] border border-white/20 dark:border-gray-800/50 bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl p-12 md:p-16 relative shadow-2xl overflow-hidden">
                    {/* Decorative element */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-400/10 rounded-full blur-[100px]" />

                    <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 mb-2">
                            <Send className="h-8 w-8 text-primary" />
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Weekly Scraping Strategies
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl mx-auto">
                                Join 5,000+ growth hackers getting the latest AI scraping techniques
                                and lead-gen workflows direct to their inbox.
                            </p>
                        </div>

                        <form className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto pt-4">
                            <Input
                                type="email"
                                placeholder="name@company.com"
                                required
                                className="h-14 px-6 bg-white/50 dark:bg-gray-950/50 border-gray-200 dark:border-gray-800 rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all text-lg"
                            />
                            <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-2xl shadow-lg shadow-primary/20">
                                Subscribe
                            </Button>
                        </form>

                        <p className="text-[12px] text-gray-400 font-medium">
                            Zero spam. Only high-value scraping insights.
                            <button className="text-primary hover:underline ml-1">Unsubscribe anytime.</button>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
