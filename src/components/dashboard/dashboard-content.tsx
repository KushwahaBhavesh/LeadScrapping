'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Zap,
  Activity,
  Search,
  MoreVertical,
  ArrowRight,
  Users,
  Database,
  CreditCard,
  Target,
  ArrowUpRight,
  Cpu,
  ShieldCheck,
  Globe,
  History as HistoryIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

const stats = [
  {
    name: 'TOTAL LEADS',
    value: '12,430',
    change: '+1,250',
    icon: Database,
    subtext: 'this month',
    href: '/dashboard/leads',
  },
  {
    name: 'ACTIVE JOBS',
    value: '4',
    change: '2 Running',
    icon: Zap,
    subtext: 'active now',
    href: '/dashboard/jobs',
  },
  {
    name: 'SUCCESS RATE',
    value: '98.2%',
    change: '+0.4%',
    icon: Target,
    subtext: 'avg extraction',
    href: '/dashboard/jobs',
  },
  {
    name: 'CREDITS USED',
    value: '4,520',
    change: '-120 today',
    icon: CreditCard,
    subtext: 'usage balance',
    href: '/dashboard/credits',
  },
];

export function DashboardContent({ userName }: { userName: string }) {
  const router = useRouter();

  return (
    <div className="py-8 space-y-10 px-6 w-full pb-20">
      {/* Daily Briefing Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[32px] bg-primary p-10 flex flex-col lg:flex-row items-center justify-between shadow-2xl"
      >
        <div className="space-y-6 relative z-10 max-w-2xl text-primary-foreground">
          <div className="flex items-center gap-2 opacity-70">
            <Activity className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Dashboard Overview</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tight uppercase">
              Welcome back, {userName.split(' ')[0]}
            </h1>
            <p className="text-lg font-bold leading-relaxed opacity-90 tracking-tight">
              The extraction process is operating at{' '}
              <span className="underline italic">Optimal Capacity</span>. You have{' '}
              <span className="underline italic">12 new high-score leads</span> waiting for
              qualification and <span className="underline italic">2 bulk jobs</span> nearing
              completion.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <Button
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-2xl px-8 h-12 font-bold uppercase text-[10px] tracking-widest shadow-xl"
              onClick={() => router.push('/dashboard/scrapping')}
            >
              <Zap className="mr-2 h-4 w-4 fill-current" /> Initialize Scrape
            </Button>
            <button
              className="flex items-center gap-2 text-[10px] font-black uppercase text-primary-foreground group tracking-widest"
              onClick={() => router.push('/dashboard/jobs')}
            >
              View Job Telemetry{' '}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Tactical Visualization Placeholder */}
        <div className="hidden lg:block relative w-[350px] aspect-square">
          <div className="absolute inset-0 bg-white/20 blur-[120px] rounded-full animate-pulse" />
          <div className="relative z-10 bg-background/10 backdrop-blur-3xl rounded-[40px] border-4 border-white/30 p-8 shadow-2xl rotate-[5deg] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50" />
            <div className="flex items-center justify-between mb-8">
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                <Cpu className="h-3 w-3 text-primary-foreground" />
              </div>
              <Badge className="bg-emerald-500 text-white border-none font-black text-[8px]">
                LIVE_DATA
              </Badge>
            </div>
            <div className="space-y-4">
              <div className="h-2 w-full bg-foreground/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  className="h-full bg-foreground"
                />
              </div>
              <div className="h-2 w-2/3 bg-foreground/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '60%' }}
                  className="h-full bg-foreground/40"
                />
              </div>
            </div>
            <div className="mt-12 flex items-center justify-between">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-2xl border-2 border-background bg-muted flex items-center justify-center"
                  >
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
              <div className="h-10 w-10 rounded-2xl bg-foreground flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                <ArrowUpRight className="h-4 w-4 text-background" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* System Overview Header */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-foreground tracking-widest uppercase">
              System Overview
            </h2>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-tight">
              <Globe className="h-3 w-3" /> Monitoring global lead infrastructure
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filter results..."
                className="bg-muted border-border pl-9 h-11 w-64 rounded-2xl text-xs font-bold uppercase tracking-tight placeholder:text-muted-foreground/50"
              />
            </div>
            <Button
              variant="outline"
              className="rounded-2xl h-11 px-5 gap-2 font-black text-[10px] uppercase tracking-widest transition-all"
              onClick={() => router.push('/dashboard/scrapping')}
            >
              <Zap className="h-3 w-3" /> New Scrape
            </Button>
            <Button
              className="rounded-2xl h-11 px-6 font-black text-[10px] uppercase tracking-widest shadow-lg transition-all"
              onClick={() => alert('Generating system report...')}
            >
              Generate Report
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, _i) => (
            <Card
              key={stat.name}
              className="border-border bg-card rounded-[32px] overflow-hidden group hover:border-primary/50 transition-all cursor-pointer shadow-xl"
              onClick={() => router.push(stat.href)}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none group-hover:text-foreground transition-colors">
                  {stat.name}
                </span>
                <div className="h-8 w-8 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <stat.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-4xl font-black text-foreground tracking-tighter uppercase tabular-nums">
                  {stat.value}
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'text-[10px] font-black px-2 py-0.5 rounded-lg',
                      stat.change.startsWith('+')
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : stat.change.startsWith('-')
                          ? 'bg-red-500/10 text-red-500'
                          : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {stat.change}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                    {stat.subtext}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Section: Tabs & Charts */}
      <div className="space-y-8">
        {/* Custom Tabs */}
        <div className="flex items-center gap-12 border-b border-border pb-2 overflow-x-auto scrollbar-hide">
          {['Lead Intelligence', 'Fleet Activity', 'Telemetry Analytics'].map((tab, i) => (
            <button
              key={tab}
              className={cn(
                'text-[10px] font-black uppercase tracking-[0.2em] pb-4 relative whitespace-nowrap transition-all',
                i === 0 ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tab}
              {i === 0 && (
                <motion.div
                  layoutId="tab-active"
                  className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Placeholder Bar Chart */}
          <Card className="lg:col-span-2 border-border bg-card rounded-[40px] p-10 space-y-10 shadow-2xl group">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-foreground uppercase tracking-widest flex items-center gap-3">
                  Extraction Logs <HistoryIcon className="h-5 w-5 text-muted-foreground" />
                </h3>
                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-60">
                  Lead discovery volume across all workers
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-2xl hover:bg-muted text-muted-foreground"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
            <div className="h-72 w-full flex items-end justify-between gap-3 px-2">
              {[40, 70, 45, 90, 65, 80, 55, 75, 50, 85, 60, 95].map((height, i) => (
                <div key={i} className="relative flex-1 group/bar">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: i * 0.05, duration: 1, ease: [0.23, 1, 0.32, 1] }}
                    className={cn(
                      'w-full rounded-2xl transition-all duration-500',
                      i % 2 === 0
                        ? 'bg-primary/20 group-hover/bar:bg-primary/40'
                        : 'bg-primary group-hover/bar:bg-primary/80'
                    )}
                  />
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-bold text-muted-foreground uppercase">
                    {['08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'][i]}:00
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Placeholder Progress Section */}
          <Card className="border-border bg-card rounded-[40px] p-10 space-y-12 shadow-2xl">
            <div className="space-y-1">
              <h3 className="text-xl font-black text-foreground uppercase tracking-widest flex items-center gap-3">
                Operational Goals <ShieldCheck className="h-5 w-5 text-emerald-500" />
              </h3>
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-60">
                Objectives for currently active cycle
              </p>
            </div>
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    EXTRACTION GOAL
                  </span>
                  <span className="text-sm font-black text-foreground tabular-nums">
                    15.2k / 20k
                  </span>
                </div>
                <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden p-0.5 border border-border">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '76%' }}
                    className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.4)]"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    AI QUALIFICATION
                  </span>
                  <span className="text-sm font-black text-foreground tabular-nums">892 / 1k</span>
                </div>
                <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden p-0.5 border border-border">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '89%' }}
                    className="h-full bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                  />
                </div>
              </div>
            </div>
            <Button
              className="w-full h-14 rounded-[20px] font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl transition-all active:scale-95"
              onClick={() => router.push('/dashboard/jobs')}
            >
              Open Command Center
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
