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
                            {['Platform', 'Solutions', 'Pricing', 'Docs'].map((item) => (
                                <Link
                                    key={item}
                                    href={`/#${item.toLowerCase()}`}
                                    className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/40 hover:text-foreground transition-colors"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Magnetic>
                            <Link href="/login" className="hidden sm:block">
                                <Button variant="ghost" className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground hover:bg-muted rounded-full h-11 px-6">
                                    Sign In
                                </Button>
                            </Link>
                        </Magnetic>
                        <Magnetic>
                            <Link href="/register">
                                <Button className="text-[11px] font-black uppercase tracking-[0.2em] rounded-full h-11 px-8 bg-primary text-primary-foreground hover:opacity-90 transition-all hover:scale-[1.05] active:scale-[0.95] shadow-lg shadow-black/10">
                                    Get Started
                                </Button>
                            </Link>
                        </Magnetic>
                        <ThemeToggle />
                        <Button variant="ghost" size="icon" className="md:hidden rounded-full text-foreground hover:bg-muted">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>
                </motion.nav>
            </div>
        </motion.header>
    );
}
