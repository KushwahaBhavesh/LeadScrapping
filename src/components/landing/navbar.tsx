import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap, Menu } from 'lucide-react';

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full px-4 pt-4">
            <div className="container mx-auto">
                <nav className="h-16 flex items-center justify-between px-6 bg-white/60 dark:bg-gray-950/60 backdrop-blur-xl border border-white/20 dark:border-gray-800/50 rounded-2xl shadow-xl shadow-gray-200/20 dark:shadow-none">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
                                <Zap className="h-5 w-5 text-white fill-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                LeadScraper <span className="text-primary italic">AI</span>
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-6">
                            {['Features', 'Solutions', 'Pricing', 'Docs'].map((item) => (
                                <Link
                                    key={item}
                                    href={`/#${item.toLowerCase()}`}
                                    className="text-sm font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link href="/login" className="hidden sm:block">
                            <Button variant="ghost" className="text-sm font-bold rounded-xl h-10 hover:bg-white/50 dark:hover:bg-gray-900/50">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button className="text-sm font-bold rounded-xl h-10 px-6 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                                Get Started
                            </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="md:hidden rounded-xl">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
