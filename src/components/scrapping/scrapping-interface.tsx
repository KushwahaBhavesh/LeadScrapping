'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { SingleUrlForm } from '@/components/scrapping/single-url-form';
import { BulkUrlForm } from '@/components/scrapping/bulk-url-form';
import { SitemapForm } from '@/components/scrapping/sitemap-form';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Files as FilesIcon,
  Map as MapIcon,
  Zap,
  Cpu,
  Terminal,
  ArrowRight,
  Activity,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export function ScrappingInterface() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('single');
  const [keywordSearch, setKeywordSearch] = useState('');

  const handleKeywordSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keywordSearch.trim()) {
      router.push(`/dashboard/leads?search=${encodeURIComponent(keywordSearch.trim())}`);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const tabVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as const },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-10 w-full px-4 md:px-0"
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-muted border border-border text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl">
            <Activity className="h-3 w-3 text-emerald-500 animate-pulse" />
            AI Extraction System
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter uppercase tabular-nums leading-none">
              Extraction{' '}
              <span className="text-muted-foreground underline decoration-primary/20 decoration-wavy underline-offset-8">
                Fleet
              </span>
            </h1>
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px] leading-relaxed max-w-xl pr-8">
              Configure and deploy scraping workers to target external websites. All extractions are
              verified via AI.
            </p>
          </div>
        </div>

        {/* Tactical Status & Search */}
        <div className="flex flex-col sm:flex-row items-center gap-8 border-l border-border pl-8 hidden lg:flex">
          <form onSubmit={handleKeywordSearch} className="relative group min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-all" />
            <Input
              placeholder="Search Keywords..."
              value={keywordSearch}
              onChange={(e) => setKeywordSearch(e.target.value)}
              className="pl-10 h-11 bg-muted border-border rounded-xl text-[10px] font-black uppercase tracking-widest placeholder:text-muted-foreground/30 focus:ring-4 focus:ring-primary/10 transition-all"
            />
          </form>
          <div className="flex gap-12">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                Active Workers
              </p>
              <p className="text-2xl font-black text-foreground tabular-nums">12/12</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                Network Load
              </p>
              <p className="text-2xl font-black text-emerald-500 tabular-nums">0.05%</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Tech Tabs List */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10">
          <TabsList className="bg-muted p-1 rounded-2xl border border-border h-auto flex w-full sm:w-auto overflow-x-auto no-scrollbar">
            <TabsTrigger
              value="single"
              className="flex-1 sm:flex-none rounded-xl px-4 md:px-8 py-3 data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground font-black text-[9px] md:text-[10px] uppercase tracking-[0.1em] transition-all gap-2"
            >
              <Globe className="h-3.5 w-3.5" />
              <span className="truncate">Single URL</span>
            </TabsTrigger>
            <TabsTrigger
              value="bulk"
              className="flex-1 sm:flex-none rounded-xl px-4 md:px-8 py-3 data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground font-black text-[9px] md:text-[10px] uppercase tracking-[0.1em] transition-all gap-2"
            >
              <FilesIcon className="h-3.5 w-3.5" />
              <span className="truncate">Batch List</span>
            </TabsTrigger>
            <TabsTrigger
              value="sitemap"
              className="flex-1 sm:flex-none rounded-xl px-4 md:px-8 py-3 data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground font-black text-[9px] md:text-[10px] uppercase tracking-[0.1em] transition-all gap-2"
            >
              <MapIcon className="h-3.5 w-3.5" />
              <span className="truncate">Sitemap</span>
            </TabsTrigger>
          </TabsList>

          <div className="hidden md:flex items-center gap-2 text-muted-foreground font-bold text-[10px] uppercase tracking-[0.1em] tabular-nums bg-muted px-4 py-2 rounded-xl border border-border/50">
            <Terminal className="h-3 w-3" /> system ready {'>'} waiting for input
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            variants={tabVariants}
            className="relative"
          >
            {/* Background Aura */}
            <div className="absolute -top-20 -left-20 h-96 w-96 bg-white/[0.02] filter blur-[100px] rounded-full pointer-events-none" />

            <TabsContent value="single" className="mt-0 outline-none">
              <Card className="border-border bg-card shadow-2xl rounded-[24px] lg:rounded-[40px] overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3 p-5 lg:p-10 bg-muted/30 border-b lg:border-b-0 lg:border-r border-border flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="h-10 w-10 lg:h-14 lg:w-14 rounded-xl lg:rounded-2xl bg-background flex items-center justify-center border border-border group-hover:border-primary/50 transition-all shadow-2xl">
                        <Globe className="h-5 w-5 lg:h-6 lg:w-6 text-foreground" />
                      </div>
                      <div className="space-y-2 lg:space-y-3">
                        <CardTitle className="text-2xl lg:text-3xl font-black uppercase tracking-tighter text-foreground">
                          Single URL
                        </CardTitle>
                        <CardDescription className="text-[10px] lg:text-[11px] font-bold uppercase tracking-widest text-muted-foreground leading-relaxed pr-4">
                          Deploy a worker to extract intelligence from a specific URL. Best for
                          detailed lead qualification.
                        </CardDescription>
                      </div>
                    </div>
                    <div className="pt-6 lg:pt-10 space-y-4">
                      <div className="flex items-center gap-3">
                        <Cpu className="h-4 w-4 text-emerald-500" />
                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                          Latency: ~200ms
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Zap className="h-4 w-4 text-amber-500 fill-amber-500/20" />
                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                          Cost: 1 Credit/Op
                        </span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="lg:w-2/3 p-5 lg:p-14 bg-muted/10">
                    <SingleUrlForm />
                  </CardContent>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="bulk" className="mt-0 outline-none">
              <Card className="border-border bg-card shadow-2xl rounded-[24px] lg:rounded-[40px] overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3 p-5 lg:p-10 bg-muted/30 border-b lg:border-b-0 lg:border-r border-border flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="h-10 w-10 lg:h-14 lg:w-14 rounded-xl lg:rounded-2xl bg-background flex items-center justify-center border border-border group-hover:border-primary/50 transition-all shadow-2xl">
                        <FilesIcon className="h-5 w-5 lg:h-6 lg:w-6 text-foreground" />
                      </div>
                      <div className="space-y-2 lg:space-y-3">
                        <CardTitle className="text-2xl lg:text-3xl font-black uppercase tracking-tighter text-foreground">
                          Batch List
                        </CardTitle>
                        <CardDescription className="text-[10px] lg:text-[11px] font-bold uppercase tracking-widest text-muted-foreground leading-relaxed pr-4">
                          Orchestrate a parallel extraction across multiple targets. Scale your lead
                          database exponentially.
                        </CardDescription>
                      </div>
                    </div>
                    <div className="pt-6 lg:pt-10 space-y-4">
                      <div className="flex items-center gap-3">
                        <Activity className="h-4 w-4 text-emerald-500" />
                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                          Concurrency: High
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <ArrowRight className="h-4 w-4 text-foreground" />
                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                          Format: CSV/Paste
                        </span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="lg:w-2/3 p-5 lg:p-14 bg-muted/10">
                    <BulkUrlForm />
                  </CardContent>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="sitemap" className="mt-0 outline-none">
              <Card className="border-border bg-card shadow-2xl rounded-[24px] lg:rounded-[40px] overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/3 p-5 lg:p-10 bg-muted/30 border-b lg:border-b-0 lg:border-r border-border flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="h-10 w-10 lg:h-14 lg:w-14 rounded-xl lg:rounded-2xl bg-background flex items-center justify-center border border-border group-hover:border-primary/50 transition-all shadow-2xl">
                        <MapIcon className="h-5 w-5 lg:h-6 lg:w-6 text-foreground" />
                      </div>
                      <div className="space-y-2 lg:space-y-3">
                        <CardTitle className="text-2xl lg:text-3xl font-black uppercase tracking-tighter text-foreground">
                          Sitemap Crawler
                        </CardTitle>
                        <CardDescription className="text-[10px] lg:text-[11px] font-bold uppercase tracking-widest text-muted-foreground leading-relaxed pr-4">
                          Deploy a crawler to map domain structures and extract leads automatically
                          via sitemaps.
                        </CardDescription>
                      </div>
                    </div>
                    <div className="pt-6 lg:pt-10 space-y-4">
                      <div className="flex items-center gap-3">
                        <Globe className="h-4 w-4 text-emerald-500" />
                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                          Depth: Unlimited
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="h-4 w-4 text-blue-500" />
                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                          Mode: Automated
                        </span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="lg:w-2/3 p-5 lg:p-14 bg-muted/10">
                    <SitemapForm />
                  </CardContent>
                </div>
              </Card>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
}
