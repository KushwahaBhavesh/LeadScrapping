import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-white dark:bg-gray-950 pt-16 pb-24 md:pt-24 md:pb-32">
            {/* Modern Gradient Mesh Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[120px]" />
                <div className="absolute top-[20%] -right-[10%] h-[30%] w-[30%] rounded-full bg-blue-400/10 blur-[100px]" />
                <div className="absolute -bottom-[10%] left-[20%] h-[40%] w-[40%] rounded-full bg-indigo-400/10 blur-[120px]" />
            </div>

            <div className="container px-4 mx-auto">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Badge */}
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-4 animate-fade-in">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2" />
                        Next-gen Lead Intelligence
                    </div>

                    {/* Headline - Display XL */}
                    <h1 className="text-display-xl font-extrabold tracking-tighter text-gray-900 dark:text-white">
                        Turn Web Data into <br />
                        <span className="text-primary">Revenue Pipeline</span>
                    </h1>

                    {/* Subtext - Body Large */}
                    <p className="text-paragraph-large text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Automated, AI-powered lead discovery that finds your ideal customers
                        across the web. Scale your outreach with precision data, not guesswork.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link href="/register">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                            >
                                Start Scraping Free
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-full sm:w-auto px-8 py-6 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all font-sans"
                        >
                            View Live Demo
                        </Button>
                    </div>

                    {/* Terminal UI - Technical/Monospace focus */}
                    <div className="relative mt-16 group mx-auto max-w-2xl">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-400/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
                        <div className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                                </div>
                                <div className="flex-1 text-center">
                                    <span className="text-xs font-mono text-gray-400">scraper-job-v2.config</span>
                                </div>
                            </div>
                            <div className="p-6 text-left font-mono text-sm sm:text-base leading-relaxed overflow-x-auto whitespace-nowrap scrollbar-hide">
                                <div className="flex gap-4">
                                    <span className="text-gray-400 select-none">1</span>
                                    <p className="text-primary font-bold">query:</p>
                                    <p className="text-gray-600 dark:text-gray-300">"SaaS CEOs in Austin, TX"</p>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-gray-400 select-none">2</span>
                                    <p className="text-primary font-bold">extract:</p>
                                    <p className="text-gray-600 dark:text-gray-300">["name", "email", "linkedin", "company_size"]</p>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-gray-400 select-none">3</span>
                                    <p className="text-primary font-bold">ai_filter:</p>
                                    <p className="text-gray-600 dark:text-gray-300">{"{ revenue_growth: '> 20%' }"}</p>
                                </div>
                                <div className="flex gap-4 mt-2">
                                    <span className="text-gray-400 select-none">4</span>
                                    <p className="text-emerald-500 font-bold">$</p>
                                    <p className="text-emerald-500 italic animate-pulse">Searching sources and verifying leads...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
