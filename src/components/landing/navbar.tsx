import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap, Menu } from 'lucide-react';

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full px-4 pt-6">
            <div className="container mx-auto">
                <nav className="h-16 flex items-center justify-between px-8 bg-white/80 backdrop-blur-xl border border-black/5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="flex items-center gap-10">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black group-hover:rotate-6 transition-transform">
                                <Zap className="h-4 w-4 text-white fill-white" />
                            </div>
                            <span className="text-xl font-black tracking-tight text-black">
                                LeadScraper
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-10">
                            {['Platform', 'Solutions', 'Pricing', 'Docs'].map((item) => (
                                <Link
                                    key={item}
                                    href={`/#${item.toLowerCase()}`}
                                    className="text-[11px] font-black uppercase tracking-[0.2em] text-black/40 hover:text-black transition-colors"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/login" className="hidden sm:block">
                            <Button variant="ghost" className="text-[11px] font-black uppercase tracking-[0.2em] text-black/60 hover:text-black hover:bg-black/5 rounded-full h-11 px-6">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button className="text-[11px] font-black uppercase tracking-[0.2em] rounded-full h-11 px-8 bg-black text-white hover:bg-neutral-800 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/10">
                                Get Started
                            </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="md:hidden rounded-full text-black">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
