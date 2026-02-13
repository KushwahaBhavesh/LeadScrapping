'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Globe, AlertCircle, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCreateJob } from '@/hooks/use-jobs';
import { toast } from 'sonner';

const singleUrlSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL (e.g., https://example.com)' }),
  keywords: z.string().optional(),
});

type SingleUrlFormData = z.infer<typeof singleUrlSchema>;

export function SingleUrlForm() {
  const router = useRouter();
  const { createJob, loading: isSubmitting } = useCreateJob();
  const [creditEstimate] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SingleUrlFormData>({
    resolver: zodResolver(singleUrlSchema),
    mode: 'onChange',
  });

  const urlValue = watch('url');

  const onSubmit = async (data: SingleUrlFormData) => {
    const keywords = data.keywords
      ? data.keywords.split(',').map(k => k.trim()).filter(k => k.length > 0)
      : [];

    const result = await createJob({
      type: 'single',
      urls: [data.url],
      options: {
        depth: 1,
        extract_emails: true,
        extract_phones: true,
        extract_social: true,
        qualify_leads: true,
        keywords,
      },
    });

    if (result.success && result.data) {
      toast.success('Job created successfully!', {
        description: `Scraping ${data.url}...`,
      });
      router.push(`/dashboard/jobs`);
    } else {
      toast.error('Failed to create job', {
        description: result.error?.message || 'Please try again',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-3">
        <Label
          htmlFor="url"
          className="text-sm font-bold uppercase tracking-wider text-muted-foreground"
        >
          Source URL
        </Label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Globe className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <Input
            id="url"
            type="url"
            placeholder="https://company.com/contact"
            className={`pl-12 h-12 md:h-14 rounded-xl md:rounded-2xl border-border bg-muted/50 text-base md:text-lg focus:ring-4 focus:ring-primary/10 transition-all ${errors.url ? 'border-red-500' : 'hover:border-primary/50'}`}
            {...register('url')}
          />
        </div>
        {errors.url && (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2 font-medium"
          >
            <AlertCircle className="h-4 w-4" />
            {errors.url.message}
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
        initial={false}
        animate={
          urlValue && !!isValid
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0.5, y: 5, scale: 0.98 }
        }
      >
        <div className="border border-border bg-muted/50 rounded-xl md:rounded-2xl p-4 md:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-background flex items-center justify-center border border-border">
              <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-[9px] md:text-[10px] font-black text-foreground uppercase tracking-widest">
                Cost Estimation
              </p>
              <p className="text-[9px] md:text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                AI qualification enabled
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xl md:text-2xl font-black text-foreground">{creditEstimate}</span>
            <span className="text-[9px] md:text-[10px] font-black text-muted-foreground ml-1 uppercase tracking-tight">
              CREDITS
            </span>
          </div>
        </div>
      </motion.div>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={isSubmitting || !urlValue || !!errors.url}
          className="w-full h-12 md:h-16 text-xs font-black uppercase tracking-[0.2em] rounded-xl md:rounded-2xl transition-all shadow-xl active:scale-95"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-3 h-5 w-5 animate-spin" />
              Initializing...
            </>
          ) : (
            <>
              Start Extraction
              <Sparkles className="ml-3 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
