'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap, Home, Globe, Shield, BookOpen, LogIn, UserPlus } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ThemeToggle } from '../theme-toggle';
import { useEffect, useState } from 'react';
import { Magnetic } from '../ui/magnetic';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Features', href: '/#features', icon: Zap },
  { label: 'Network', href: '/#network', icon: Globe },
  { label: 'Security', href: '/#security', icon: Shield },
  { label: 'Docs', href: '/#documentation', icon: BookOpen },
  { label: 'Sign In', href: '/login', icon: LogIn },
  { label: 'Get Started', href: '/register', icon: UserPlus },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Desktop Scroll Animations
  const headerPadding = useTransform(scrollY, [0, 50], ['24px', '12px']);
  const navWidth = useTransform(scrollY, [0, 50], ['100%', '90%']);
  const navShadow = useTransform(
    scrollY,
    [0, 50],
    ['0 0px 0px rgba(0,0,0,0)', '0 20px 40px rgba(0,0,0,0.1)']
  );

  if (!mounted) return null;

  return (
    <TooltipProvider>
      {/* --- DESKTOP NAVBAR (lg+) --- */}
      <motion.header
        style={{ paddingTop: headerPadding }}
        className="fixed top-0 z-50 w-full px-4 pointer-events-none hidden lg:block"
      >
        <div className="container mx-auto flex justify-center">
          <motion.nav
            style={{
              width: navWidth,
              boxShadow: navShadow,
            }}
            className="h-16 flex items-center justify-between px-8 bg-background/60 backdrop-blur-xl border border-border shadow-2xl rounded-full pointer-events-auto transition-colors duration-500"
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

              <div className="flex items-center gap-10">
                {['Features', 'Network', 'Security', 'Documentation'].map((item) => (
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
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground hover:bg-muted rounded-full h-11 px-6"
                  >
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
            </div>
          </motion.nav>
        </div>
      </motion.header>

      {/* --- TABLET/MOBILE TOP BAR --- */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 bg-background/60 backdrop-blur-xl border-b border-border shadow-sm">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground fill-primary-foreground" />
          </div>
          <span className="text-lg font-black tracking-tight text-foreground">LeadScraper</span>
        </Link>
        <ThemeToggle />
      </div>

      {/* --- FLOATING BOTTOM MENU BAR (Tablet/Mobile) --- */}
      <div className="lg:hidden fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-1 p-2 bg-background/80 backdrop-blur-2xl border border-border shadow-2xl rounded-full pointer-events-auto"
        >
          {navItems.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="h-10 w-10 flex items-center justify-center rounded-full text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <item.icon className="h-5 w-5" />
                  </motion.div>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="font-black uppercase text-[10px] tracking-widest mb-2"
              >
                {item.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </motion.nav>
      </div>
    </TooltipProvider>
  );
}
