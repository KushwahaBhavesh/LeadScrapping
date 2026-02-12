'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Zap, Loader2, Mail, Lock } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const supabase = createClient();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/auth/google', { method: 'POST' });
      const data = await res.json();

      if (data.success && data.data.url) {
        window.location.href = data.data.url;
      } else {
        setError(data.error?.message || 'Failed to initiate Google login');
        setLoading(false);
      }
    } catch {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error?.message || 'Authentication failed');
        setLoading(false);
        return;
      }

      // If login is successful, the session is already managed by Supabase cookies
      // because the API route uses createClient from @supabase/ssr
      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('Connection failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-foreground/50 ml-1 uppercase tracking-widest">
            User_ID (Email)
          </label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30 group-focus-within:text-primary transition-all duration-300" />
            <Input
              name="email"
              type="email"
              placeholder="admin@protocol.sh"
              required
              className="pl-11 h-12 bg-background/20 border-white/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300 font-mono text-sm placeholder:text-foreground/20 text-foreground"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between ml-1">
            <label className="text-[10px] font-black text-foreground/50 uppercase tracking-widest">
              Access_Key
            </label>
            <button
              type="button"
              className="text-[10px] font-bold text-primary/80 hover:text-primary hover:underline underline-offset-4 uppercase tracking-wider transition-colors"
            >
              Recover Key?
            </button>
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30 group-focus-within:text-primary transition-all duration-300" />
            <Input
              name="password"
              type="password"
              placeholder="••••••••••••"
              required
              className="pl-11 h-12 bg-background/20 border-white/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300 font-mono text-sm placeholder:text-foreground/20 text-foreground tracking-widest"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs font-bold text-red-400 animate-in fade-in slide-in-from-top-1 font-mono">
          ERROR: {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full h-14 text-sm font-black shadow-lg shadow-primary/20 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground uppercase tracking-widest transition-all active:scale-[0.98] group relative overflow-hidden"
        disabled={loading}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Authenticating...
          </>
        ) : (
          <>
            Initialize Session
            <Zap className="ml-2 h-4 w-4 fill-current group-hover:scale-110 transition-transform" />
          </>
        )}
      </Button>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/5" />
        </div>
        <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest text-foreground/30">
          <span className="bg-background/0 px-2 backdrop-blur-sm">System Options</span>
        </div>
      </div>

      <Button
        variant="outline"
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full h-12 font-bold rounded-xl border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-foreground/70 transition-all"
      >
        <svg className="mr-2 h-4 w-4 opacity-70" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Sync with Google
      </Button>
    </form>
  );
}
