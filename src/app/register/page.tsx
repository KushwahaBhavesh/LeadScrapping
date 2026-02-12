'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Zap, ChevronLeft, CheckCircle2, Sparkles, TrendingUp, Users, Globe } from 'lucide-react';
import { RegisterForm } from '@/components/auth/register-form';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

function RegisterContent() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get('success') === 'true';

  if (isSuccess) {
    return (
      <div className="w-full max-w-[440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-muted/50 border border-emerald-500/20 rounded-3xl p-12 backdrop-blur-xl text-center"
        >
          <div className="h-20 w-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-emerald-500/20">
            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
          </div>

          <h1 className="text-3xl font-black text-foreground mb-4">Account Created!</h1>
          <p className="text-sm text-foreground/60 mb-8 leading-relaxed">
            Your account has been successfully created. Check your email to verify and get started.
          </p>

          <Link href="/login">
            <Button className="w-full h-14 text-md font-bold rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white">
              Continue to Login
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[440px] mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-14 w-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Zap className="h-7 w-7 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-foreground tracking-tight">Get Started</h1>
              <p className="text-sm text-foreground/40 font-medium mt-1">
                Create your account in seconds
              </p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="space-y-6">
          <RegisterForm />

          <div className="pt-6 border-t border-border">
            <p className="text-sm text-foreground/40 text-center">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-primary hover:text-foreground transition-all font-bold"
              >
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen flex bg-background">
      {/* LEFT PANEL - Form Section */}
      <div className="relative w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-20 overflow-y-auto">
        {/* Back Button */}
        <div className="absolute top-8 left-8">
          <Link href="/">
            <Button
              variant="ghost"
              className="h-12 px-6 gap-3 rounded-full border border-border hover:bg-muted group text-foreground/40 hover:text-foreground transition-all"
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
                Home
              </span>
            </Button>
          </Link>
        </div>

        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full">
              <Zap className="h-8 w-8 text-primary animate-pulse" />
            </div>
          }
        >
          <RegisterContent />
        </Suspense>
      </div>

      {/* RIGHT PANEL - Visual/Branding Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary/10 via-indigo-500/10 to-purple-500/10 overflow-hidden">
        <div className="absolute inset-0 blueprint opacity-[0.05]" />

        {/* Ambient Glow */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px]" />

        <div className="relative z-10 flex flex-col justify-center p-16 xl:p-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12"
          >
            {/* Hero Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-foreground/60">
                  Join 10,000+ Users
                </span>
              </div>
              <h2 className="text-5xl xl:text-6xl font-black text-foreground tracking-tight leading-[1.1]">
                Your Lead Generation
                <br />
                <span className="text-primary">Starts Here.</span>
              </h2>
              <p className="text-lg text-foreground/60 font-medium leading-relaxed max-w-[480px]">
                Join thousands of businesses using our platform to discover, extract, and convert
                high-quality leads at scale.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="text-3xl font-black text-foreground">3.2M+</div>
                <div className="text-xs font-medium text-foreground/40 uppercase tracking-wider">
                  Leads Extracted
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Users className="h-5 w-5" />
                </div>
                <div className="text-3xl font-black text-foreground">10K+</div>
                <div className="text-xs font-medium text-foreground/40 uppercase tracking-wider">
                  Active Users
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="text-3xl font-black text-foreground">150+</div>
                <div className="text-xs font-medium text-foreground/40 uppercase tracking-wider">
                  Countries
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="pt-8 border-t border-border">
              <div className="space-y-4">
                <p className="text-foreground/80 font-medium italic leading-relaxed">
                  "This platform transformed our outreach. We've 10x'd our qualified leads in just 3
                  months."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-indigo-500" />
                  <div>
                    <div className="text-sm font-bold text-foreground">Sarah Chen</div>
                    <div className="text-xs text-foreground/40">Head of Growth, TechCorp</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Grain Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] grain" />
      </div>
    </main>
  );
}
