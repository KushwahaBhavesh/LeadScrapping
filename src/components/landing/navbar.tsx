import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap, Menu } from 'lucide-react';

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm">
            <div className="container px-4 mx-auto flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-y-0 gap-2 group">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:rotate-6 transition-transform">
                        <Zap className="h-5 w-5 text-white fill-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        LeadScraper <span className="text-primary italic">AI</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {['Features', 'Pricing', 'Docs', 'About'].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                        Log in
                    </Link>
                    <Link href="/register">
                        <Button className="hidden sm:flex font-bold shadow-md shadow-primary/20 rounded-lg px-6">
                            Get Started
                        </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
