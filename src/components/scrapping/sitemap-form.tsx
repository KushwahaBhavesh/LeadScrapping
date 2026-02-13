'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, AlertCircle, Sparkles, Map } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCreateJob } from '@/hooks/use-jobs';
import { toast } from 'sonner';

const sitemapSchema = z.object({
  sitemapUrl: z
    .string()
    .url({ message: 'Please enter a valid sitemap URL' })
    .refine((url) => url.endsWith('.xml') || url.includes('sitemap'), {
      message: 'URL should point to a sitemap.xml file',
    }),
  keywords: z.string().optional(),
});

type SitemapFormData = z.infer<typeof sitemapSchema>;

export function SitemapForm() {
  const router = useRouter();
  const { createJob, loading: isSubmitting } = useCreateJob();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SitemapFormData>({
    resolver: zodResolver(sitemapSchema),
    mode: 'onChange',
  });

  const sitemapUrlValue = watch('sitemapUrl');

  const onSubmit = async (data: SitemapFormData) => {
    const keywords = data.keywords
      ? data.keywords.split(',').map(k => k.trim()).filter(k => k.length > 0)
      : [];

    const result = await createJob({
      type: 'sitemap',
      urls: [data.sitemapUrl],
      options: {
        depth: 3,
        extract_emails: true,
        qualify_leads: true,
        keywords,
      },
    });

    if (result.success && result.data) {
      toast.success('Sitemap crawler deployed!', {
        description: `Scanning sitemap at ${data.sitemapUrl}`,
      });
      router.push(`/dashboard/jobs/${result.data.id}`);
    } else {
      toast.error('Failed to create crawling job', {
        description: result.error?.message || 'Please check the URL and try again',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-3">
        <Label
          htmlFor="sitemapUrl"
          className="text-sm font-bold uppercase tracking-wider text-muted-foreground"
        >
          Sitemap Index URL
        </Label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Map className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <Input
            id="sitemapUrl"
            type="url"
            placeholder="https://example.com/sitemap.xml"
            className={`pl-12 h-12 md:h-14 rounded-xl md:rounded-2xl border-border bg-muted/50 text-base md:text-lg focus:ring-4 focus:ring-primary/10 transition-all ${errors.sitemapUrl ? 'border-red-500' : 'hover:border-primary/50'}`}
            {...register('sitemapUrl')}
          />
        </div>
        {errors.sitemapUrl && (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2 font-medium"
          >
            <AlertCircle className="h-4 w-4" />
            {errors.sitemapUrl.message}
          </motion.p>
        )}
      </div>

      <div className="space-y-3">
        <Label
          htmlFor="keywords"
          className="text-sm font-bold uppercase tracking-wider text-muted-foreground"
        >
          Target Keywords (Optional)
        </Label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Sparkles className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <Input
            id="keywords"
            type="text"
            placeholder="SaaS, E-commerce, Marketing (comma separated)"
            className="pl-12 h-12 md:h-14 rounded-xl md:rounded-2xl border-border bg-muted/50 text-base md:text-lg focus:ring-4 focus:ring-primary/10 transition-all hover:border-primary/50"
            {...register('keywords')}
          />
        </div>
        <p className="text-[10px] text-muted-foreground font-medium italic">
          Only leads from pages matching these keywords will be captured.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={sitemapUrlValue && !!isValid ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 10 }}
      >
        <div className="border border-border bg-muted/50 rounded-xl md:rounded-2xl p-4 md:p-6 flex gap-4">
          <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-background flex items-center justify-center border border-border shrink-0">
            <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="text-[9px] md:text-[10px] font-black text-foreground uppercase tracking-widest">
              System Insight
            </p>
            <p className="text-[9px] md:text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-relaxed">
              Worker nodes will automatically discover and analyze all pages within this sitemap.
              Final counts will be available after the initial scan.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={isSubmitting || !sitemapUrlValue || !!errors.sitemapUrl}
          className="w-full h-12 md:h-16 text-xs font-black uppercase tracking-[0.2em] rounded-xl md:rounded-2xl transition-all shadow-xl active:scale-95"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-3 h-5 w-5 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              Start Crawler
              <Sparkles className="ml-3 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
