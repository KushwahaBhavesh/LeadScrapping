'use client';

import Link from 'next/link';
import {
  Zap,
  Github,
  Twitter,
  Linkedin,
  ArrowUpRight,
  ShieldCheck,
  Binary,
  Instagram,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Magnetic } from '../ui/magnetic';

const footerSections = [
  {
    title: 'Platform',
    links: [
      { label: 'Scraping', href: '/#features' },
      { label: 'Extraction', href: '/#features' },
      { label: 'Proxies', href: '/#network' },
      { label: 'Integrations', href: '/#features' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/docs' },
      { label: 'System Status', href: '/status' },
      { label: 'Changelog', href: '/changelog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Security', href: '/security' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'GDPR', href: '/gdpr' },
    ],
  },
];

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

export function Footer() {
  return (
    <footer className="relative pt-24 sm:pt-32 md:pt-40 lg:pt-48 pb-12 sm:pb-16 bg-background border-t border-foreground/5 overflow-hidden selection:bg-primary/30">
      {/* Background HUD Engine */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 blueprint opacity-[0.03]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <motion.div
          animate={{ opacity: [0.01, 0.03, 0.01] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-[-10%] right-[-5%] text-[20vw] font-black italic text-foreground leading-none uppercase tracking-tighter opacity-[0.02]"
        >
          LeadScraper
        </motion.div>
      </div>

      <div className="container relative z-10 px-4 sm:px-6 md:px-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* --- BRAND MONOLITH SECTION --- */}
          <div className="lg:col-span-4 space-y-8 sm:space-y-10">
            <div className="space-y-6">
              <Link href="/" className="flex items-center gap-4 group">
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-[0_20px_40px_rgba(var(--color-primary),0.3)] group-hover:shadow-[0_25px_50px_rgba(var(--color-primary),0.5)] transition-all duration-700"
                >
                  <Zap className="h-6 w-6 text-primary-foreground fill-primary-foreground" />
                </motion.div>
                <span className="text-3xl font-black tracking-tighter text-foreground uppercase italic leading-none">
                  LeadScraper
                </span>
              </Link>
              <p className="text-lg sm:text-xl font-medium text-foreground/40 leading-relaxed italic tracking-tight max-w-sm">
                The most powerful lead generation platform for growth teams. Find, verify, and
                export leads in seconds.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                {socialLinks.map((social, i) => (
                  <Magnetic key={i}>
                    <Link
                      href={social.href}
                      className="h-12 w-12 rounded-xl border border-foreground/5 bg-foreground/[0.02] flex items-center justify-center text-foreground/30 hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all duration-500 group"
                    >
                      <social.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                      <span className="sr-only">{social.label}</span>
                    </Link>
                  </Magnetic>
                ))}
              </div>

              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl border border-primary/10 bg-primary/5 w-fit group">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--color-primary),0.6)]" />
                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-primary/80 group-hover:text-primary transition-colors">
                  System Status: Operational
                </span>
              </div>
            </div>
          </div>

          {/* --- NAVIGATION GRID --- */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 sm:gap-16">
              {footerSections.map((section, idx) => (
                <div key={idx} className="space-y-6 sm:space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                    <h4 className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-foreground/30">
                      {section.title}
                    </h4>
                  </div>
                  <ul className="space-y-4">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link
                          href={link.href}
                          className="group flex items-center gap-2 text-sm font-black text-foreground/40 hover:text-foreground uppercase tracking-tighter italic transition-all"
                        >
                          <span className="group-hover:translate-x-1 transition-transform inline-block">
                            {link.label}
                          </span>
                          <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-primary" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- SYSTEM TELEMETRY FOOTER --- */}
        <div className="mt-24 sm:mt-32 pt-10 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 sm:gap-8 lg:gap-10">
            <span className="text-[10px] font-mono font-black text-foreground/20 uppercase tracking-[0.3em]">
              © {new Date().getFullYear()} LEAD_SCRAPER_LABS
            </span>
            <div className="h-4 w-px bg-foreground/5 hidden sm:block" />
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500/30" />
                <span className="text-[9px] font-mono font-black text-foreground/20 uppercase tracking-widest">
                  SECURE
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Binary className="h-3.5 w-3.5 text-primary/30" />
                <span className="text-[9px] font-mono font-black text-foreground/20 uppercase tracking-widest">
                  v5.3.2
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8 px-6 py-3 rounded-2xl bg-foreground/[0.02] border border-foreground/5 glass">
            <div className="flex flex-col items-center sm:items-end">
              <span className="text-[8px] font-mono font-black text-foreground/10 uppercase tracking-[0.4em]">
                Processing
              </span>
              <span className="text-[10px] font-mono font-black text-primary/60">
                12k+ LEADS/SEC
              </span>
            </div>
            <div className="h-8 w-px bg-foreground/10" />
            <Magnetic>
              <Link href="/status" className="group">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-3 w-3 rounded-full bg-emerald-500/20" />
                    <div className="absolute inset-1 h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <span className="text-[10px] font-mono font-black text-foreground/40 group-hover:text-foreground transition-colors uppercase tracking-widest">
                    All Systems: OK
                  </span>
                </div>
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}
