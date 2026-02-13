'use client';

import { useRef } from 'react';
import { Shield, Zap, ChartBar, Globe, ArrowRight, Network, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { Magnetic } from '../ui/magnetic';

const features = [
  {
    title: 'Smart Scraping',
    description:
      'Our AI adapts to website changes automatically. You always get the data you need, without maintenance.',
    icon: Zap,
    className: 'md:col-span-2',
    accent: 'Always On',
    metrics: '99.9% Uptime',
  },
  {
    title: 'Global Proxies',
    description:
      "Access data from any country. We handle the complex proxy networks so you don't have to.",
    icon: Globe,
    className: 'md:col-span-1',
    accent: 'Worldwide',
    metrics: '2.4M IPs',
  },
  {
    title: 'Verified Emails',
    description:
      'We validate every contact in real-time. No more guessing—only reach out to real people.',
    icon: Shield,
    className: 'md:col-span-1',
    accent: 'Real Data',
    metrics: '< 1% Bounce',
  },
  {
    title: 'Easy Integration',
    description:
      'Connect directly to your favorite tools. Send leads to your CRM or marketing platform instantly.',
    icon: ChartBar,
    className: 'md:col-span-2',
    accent: 'Plug & Play',
    metrics: 'API Ready',
  },
];

export function Features() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      id="features"
      ref={containerRef}
      className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative bg-background overflow-hidden grain"
    >
      {/* Background Parallax Elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[10%] right-[10%] opacity-[0.02] pointer-events-none"
      >
        <Network className="w-96 h-96" />
      </motion.div>
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-[10%] left-[10%] opacity-[0.02] pointer-events-none"
      >
        <Cpu className="w-80 h-80" />
      </motion.div>

      {/* Blueprint Grid Layer */}
      <div className="absolute inset-0 blueprint pointer-events-none opacity-[0.05]" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center space-y-4 sm:space-y-5 md:space-y-6 mb-16 sm:mb-20 max-w-4xl mx-auto px-4 sm:px-0"
        >
          <div className="flex items-center gap-3 sm:gap-4 text-primary/40 font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[9px] sm:text-[10px]">
            <span className="h-px w-6 sm:w-8 bg-primary/20" />
            Designed for Growth
            <span className="h-px w-6 sm:w-8 bg-primary/20" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-none uppercase italic">
            Automated <br />
            <span className="text-foreground/20">Lead Gen.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/40 font-medium leading-relaxed max-w-2xl px-4 sm:px-0">
            Everything you need to find, verify, and close more deals.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        <div className="mt-16 sm:mt-24 flex flex-col items-center space-y-6 sm:space-y-8">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12 opacity-20">
            {['LATENCY: < 120ms', 'UPTIME: 99.99%', 'SECURITY: SOC2-II'].map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em]"
              >
                <div className="h-1 w-1 bg-primary rounded-full" />
                {stat}
              </div>
            ))}
          </div>

          <Magnetic>
            <Link href="/register">
              <Button className="text-[11px] font-black uppercase tracking-[0.2em] rounded-full h-11 px-8 bg-primary text-primary-foreground hover:opacity-90 transition-all hover:scale-[1.05] active:scale-[0.95] shadow-lg shadow-black/10">

                Get Started Now
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
  className: string;
  accent: string;
  metrics: string;
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-foreground/[0.02] border border-foreground/5 hover:border-foreground/10 transition-colors',
        'p-6 sm:p-8 hover:bg-foreground/[0.04]',
        feature.className
      )}
      onMouseMove={handleMouseMove}
    >
      {/* Animated Gradient Blob on Hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(600px circle at ${x}px ${y}px, rgba(var(--color-primary), 0.1), transparent 40%)`
          ),
        }}
      />

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div className="h-12 w-12 rounded-2xl bg-background border border-foreground/10 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
            <feature.icon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex items-center gap-2 rounded-full border border-foreground/5 bg-foreground/[0.02] px-3 py-1">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-wider font-mono font-medium text-foreground/40">
              {feature.accent}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">{feature.title}</h3>
          <p className="text-foreground/60 leading-relaxed max-w-[90%]">
            {feature.description}
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-8 flex items-center gap-2 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">
          Learn more
        </span>
        <ArrowRight className="h-3 w-3 text-primary" />
      </div>
    </motion.div>
  );
}
