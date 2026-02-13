'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Database, Shield, Sparkles, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Magnetic } from '@/components/ui/magnetic';
import { Marquee } from '@/components/ui/marquee';
import { Github, Twitter, Linkedin, Slack, Chrome, Layers } from 'lucide-react';

export function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityVal = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-36 md:pb-24 lg:pb-48 overflow-hidden bg-background grain"
    >
      {/* Background Parallax & Floating Nodes */}
      <motion.div
        style={{ y: yBg, opacity: opacityVal }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Data Beams */}
        <div className="absolute top-[30%] left-0 w-full h-[1px] opacity-20">
          <div className="data-beam" style={{ animationDelay: '0s' }} />
        </div>
        <div className="absolute top-[60%] left-0 w-full h-[1px] opacity-10">
          <div className="data-beam" style={{ animationDelay: '1.5s' }} />
        </div>
        {/* Orbital Blurs */}
        <div className="absolute top-20 left-[15%] w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[140px] opacity-[0.05]" />
        <div className="absolute bottom-40 right-[15%] w-[500px] h-[500px] bg-purple-500 rounded-full blur-[140px] opacity-[0.05]" />

        {/* Floating "Data Nodes" */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
            className={cn(
              'absolute w-12 h-12 border border-border rounded-2xl bg-muted/40 backdrop-blur-sm flex items-center justify-center shadow-sm',
              i === 0 && 'top-[20%] left-[10%]',
              i === 1 && 'top-[40%] right-[12%]',
              i === 2 && 'bottom-[30%] left-[15%]',
              i === 3 && 'top-[15%] right-[20%]',
              i === 4 && 'bottom-[15%] right-[25%]',
              i === 5 && 'top-[60%] left-[8%]'
            )}
            style={{
              translateY: (i + 1) * 20, // Static offset for initial placement
            }}
          >
            <div className="h-1.5 w-1.5 rounded-full bg-indigo-500/30" />
          </motion.div>
        ))}

        {/* Micro-Noise Texture */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      </motion.div>

      <div className="container px-4 sm:px-6 md:px-8 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8 md:space-y-10">
          {/* Minimalist Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'circOut' }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background shadow-sm animate-fade-in hover:border-primary/50 transition-all cursor-default group"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-foreground/40">
              The Lead Generation Engine
            </span>
          </motion.div>

          {/* Bold Centered Headline */}
          <div className="space-y-4 sm:space-y-5  px-2 sm:px-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-foreground leading-[1.05]">
              {['Automate Lead Scraping.'].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: 'circOut' }}
                  className="inline-block mr-[0.2em]"
                >
                  {word}
                </motion.span>
              ))}
              <br />
              <span className="text-foreground/30 italic">
                {['Powered by AI.'].map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 + i * 0.1, ease: 'circOut' }}
                    className="inline-block mr-[0.2em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/50 max-w-3xl mx-auto font-medium leading-relaxed px-4 sm:px-0"
            >
              AI-driven lead scraping with built-in compliance checks and precision keyword targeting. More leads. Less risk.
            </motion.p>
          </div>

          {/* Industrial Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'circOut' }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto pt-2 px-4 sm:px-0"
          >
            <Magnetic>
              <Link href="/register" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto sm:min-w-[200px] h-12 sm:h-14 text-sm sm:text-base font-bold rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300 active:scale-95 shadow-lg group"
                >
                  Start Scraping Free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </Magnetic>
            <Magnetic>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto sm:min-w-[200px] h-12 sm:h-14 text-sm sm:text-base font-bold rounded-full border-border bg-background text-foreground hover:bg-muted transition-all active:scale-95"
              >
                View Live Demo
              </Button>
            </Magnetic>
          </motion.div>

          {/* Minimalist Trust Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="w-full max-w-5xl pt-12 sm:pt-16 md:pt-20 lg:pt-24"
          >
            <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-foreground/20 text-center">
                Trusted by growth teams at
              </span>
              <Marquee duration={25}>
                {[
                  { name: 'Vercel', icon: Layers },
                  { name: 'OpenAI', icon: Zap },
                  { name: 'GitHub', icon: Github },
                  { name: 'Slack', icon: Slack },
                  { name: 'Chrome', icon: Chrome },
                  { name: 'Twitter', icon: Twitter },
                  { name: 'LinkedIn', icon: Linkedin },
                ].map((brand, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 sm:gap-3 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-default"
                  >
                    <brand.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="text-base sm:text-lg md:text-xl font-black  uppercase">
                      {brand.name}
                    </span>
                  </div>
                ))}
              </Marquee>
            </div>
          </motion.div>
        </div>

        {/* Industrial Grid Presentation */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: 'circOut' }}
          className="mt-12 sm:mt-16 md:mt-24 lg:mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border rounded-2xl sm:rounded-3xl md:rounded-[32px] overflow-hidden bg-background/50 backdrop-blur-xl shadow-2xl mx-4 sm:mx-0"
        >
          {[
            {
              title: '500M+ Leads',
              desc: 'Access a massive global database of B2B contacts.',
              icon: Database,
            },
            {
              title: 'Real-time Verified',
              desc: 'We check every email so you never bounce.',
              icon: Shield,
            },
            {
              title: 'Sync to CRM',
              desc: 'Push leads to HubSpot or Salesforce in one click.',
              icon: Sparkles,
            },
          ].map((item, i) => (
            <div
              key={i}
              className={cn(
                'p-6 sm:p-8 md:p-10 transition-all hover:bg-muted/50 flex flex-col space-y-4 sm:space-y-5 group cursor-default backdrop-blur-sm',
                i < 2 ? 'md:border-r border-border' : '',
                i < 2 ? 'border-b md:border-b-0 border-border' : ''
              )}
            >
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-primary flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-md">
                <item.icon className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors uppercase ">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-foreground/50 font-medium leading-relaxed tracking-tight">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
