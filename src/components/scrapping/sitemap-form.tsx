'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, FileText, AlertCircle, Sparkles, Map } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const sitemapSchema = z.object({
    sitemapUrl: z.string().url({ message: 'Please enter a valid sitemap URL' }).refine(
        (url) => url.endsWith('.xml') || url.includes('sitemap'),
        { message: 'URL should point to a sitemap.xml file' }
    ),
});

type SitemapFormData = z.infer<typeof sitemapSchema>;

export function SitemapForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [creditEstimate, setCreditEstimate] = useState(0);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm<SitemapFormData>({
        resolver: zodResolver(sitemapSchema),
        mode: 'onChange'
    });

    const sitemapUrlValue = watch('sitemapUrl');

    const onSubmit = async (data: SitemapFormData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/scrapping', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobType: 'sitemap',
                    sitemapUrl: data.sitemapUrl,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create scrapping job');
            }

            const result = await response.json();
            router.push(`/jobs/${result.jobId}`);
        } catch (error) {
            console.error('Error creating job:', error);
            alert('Failed to create scrapping job. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-3">
                <Label htmlFor="sitemapUrl" className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Sitemap Index URL
                </Label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Map className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                    </div>
                    <Input
                        id="sitemapUrl"
                        type="url"
                        placeholder="https://example.com/sitemap.xml"
                        className={`pl-12 h-14 rounded-2xl border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 text-lg focus:ring-4 focus:ring-primary/10 transition-all ${errors.sitemapUrl ? 'border-red-500' : 'hover:border-primary/50'}`}
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

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={(sitemapUrlValue && !!isValid) ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 10 }}
            >
                <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800 rounded-2xl p-6">
                    <div className="flex gap-4">
                        <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                            <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-black text-amber-900 dark:text-amber-400 uppercase tracking-tight">Crawler Insight</p>
                            <p className="text-sm text-amber-800/70 dark:text-amber-400/60 leading-relaxed font-medium">
                                We will automatically discover and analyze all linked pages within this sitemap.
                                Estimated costs will be presented after the initial index scan.
                            </p>
                        </div>
                    </div>
                </Alert>
            </motion.div>

            <div className="pt-2">
                <Button
                    type="submit"
                    disabled={isSubmitting || !sitemapUrlValue || !!errors.sitemapUrl}
                    className="w-full h-16 text-lg font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all group"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                            Indexing Structure...
                        </>
                    ) : (
                        <>
                            Initialize Crawler
                            <Sparkles className="ml-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}
