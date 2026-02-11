"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap, Menu } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ThemeToggle } from '../theme-toggle';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Magnetic } from '../ui/magnetic';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Navbar() {
    const { scrollY } = useScroll();
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Dynamic styles based on scroll
    const headerPadding = useTransform(scrollY, [0, 50], ["24px", "12px"]);
    const navWidth = useTransform(scrollY, [0, 50], ["100%", "90%"]);

    const navShadow = useTransform(scrollY, [0, 50], ["0 0px 0px rgba(0,0,0,0)", "0 20px 40px rgba(0,0,0,0.1)"]);

    if (!mounted) return null;

    return (
        <motion.header
            style={{ paddingTop: headerPadding }}
            className="fixed top-0 z-50 w-full px-4 pointer-events-none"
        >
            <div className="container mx-auto flex justify-center">
                <motion.nav
                    style={{
                        width: navWidth,
                        boxShadow: navShadow
                    }}
                    className={cn(
                        "h-16 flex items-center justify-between px-8 glass shadow-2xl rounded-full pointer-events-auto transition-colors duration-500",
                        theme === 'dark' ? "bg-black/40" : "bg-white/40"
                    )}
                >
                    <div className="flex items-center gap-10">
                        <Magnetic>
                            <Link href="/" className="flex items-center gap-2 group">
                                <motion.div
                                    whileHover={{ rotate: 12, scale: 1.1 }}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary transition-transform"
                                >
                                    <Zap className="h-4 w-4 text-primary-foreground fill-primary-foreground" />
                                </motion.div>
                                <span className="text-xl font-black tracking-tight text-foreground">
                                    LeadScraper
                                </span>
                            </Link>
                        </Magnetic>

                        <div className="hidden md:flex items-center gap-10">
                            {['Scraper_Engine', 'Proxy_Network', 'Compliance', 'API_Docs'].map((item) => (
                                <Link
                                    key={item}
                                    href={`/#${item.toLowerCase().replace('_', '-')}`}
                                    className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/40 hover:text-foreground transition-colors"
                                >
                                    {item.replace('_', ' ')}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Magnetic>
                            <Link href="/login" className="hidden sm:block">
                                <Button variant="ghost" className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground hover:bg-muted rounded-full h-11 px-6">
                                    Console_Login
                                </Button>
                            </Link>
                        </Magnetic>
                        <Magnetic>
                            <Link href="/register">
                                <Button className="text-[11px] font-black uppercase tracking-[0.2em] rounded-full h-11 px-8 bg-primary text-primary-foreground hover:opacity-90 transition-all hover:scale-[1.05] active:scale-[0.95] shadow-lg shadow-black/10">
                                    Start_Harvest
                                </Button>
                            </Link>
                        </Magnetic>

                        <div className="hidden sm:block">
                            <ThemeToggle />
                        </div>

                        {/* Mobile Menu */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden rounded-full text-foreground hover:bg-muted h-11 w-11">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] glass border-l border-white/10 p-0">
                                <div className="flex flex-col h-full bg-background/80 backdrop-blur-3xl pt-20 px-8">
                                    <div className="flex flex-col gap-8">
                                        {['Scraper_Engine', 'Proxy_Network', 'Compliance', 'API_Docs'].map((item) => (
                                            <Link
                                                key={item}
                                                href={`/#${item.toLowerCase().replace('_', '-')}`}
                                                className="text-2xl font-black uppercase tracking-tighter text-foreground/40 hover:text-primary transition-all italic"
                                            >
                                                {item.replace('_', ' ')}
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="mt-auto pb-12 space-y-4">
                                        <div className="h-px w-full bg-white/5" />
                                        <div className="flex items-center justify-between py-4">
                                            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-foreground/20">Interface_Mode</span>
                                            <ThemeToggle />
                                        </div>
                                        <Link href="/login" className="block">
                                            <Button variant="outline" className="w-full h-14 rounded-2xl border-white/5 bg-white/[0.02] text-xs font-black uppercase tracking-widest italic">
                                                Console_Login
                                            </Button>
                                        </Link>
                                        <Link href="/register" className="block">
                                            <Button className="w-full h-14 rounded-2xl bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest italic">
                                                Initialize_Harvest
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </motion.nav>
            </div>
        </motion.header>
    );
}
