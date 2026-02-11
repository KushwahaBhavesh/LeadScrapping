'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Globe, AlertCircle, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const singleUrlSchema = z.object({
    url: z.string().url({ message: 'Please enter a valid URL (e.g., https://example.com)' }),
});

type SingleUrlFormData = z.infer<typeof singleUrlSchema>;

export function SingleUrlForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [creditEstimate, setCreditEstimate] = useState(1);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm<SingleUrlFormData>({
        resolver: zodResolver(singleUrlSchema),
        mode: 'onChange'
    });

    const urlValue = watch('url');

    const onSubmit = async (data: SingleUrlFormData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/scrapping', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobType: 'single',
                    urls: [data.url],
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
                <Label htmlFor="url" className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Source URL
                </Label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Globe className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                    </div>
                    <Input
                        id="url"
                        type="url"
                        placeholder="https://company.com/contact"
                        className={`pl-12 h-14 rounded-2xl border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 text-lg focus:ring-4 focus:ring-primary/10 transition-all ${errors.url ? 'border-red-500' : 'hover:border-primary/50'}`}
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

            <motion.div
                initial={false}
                animate={(urlValue && !!isValid) ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.5, y: 5, scale: 0.98 }}
            >
                <Alert className="border-primary/20 bg-primary/5 dark:bg-primary/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Sparkles className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">AI Credit Estimate</p>
                                <p className="text-xs text-gray-500 font-medium">Includes deep extraction & verification</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-2xl font-black text-primary">{creditEstimate}</span>
                            <span className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-tighter">Credit</span>
                        </div>
                    </div>
                </Alert>
            </motion.div>

            <div className="pt-2">
                <Button
                    type="submit"
                    disabled={isSubmitting || !urlValue || !!errors.url}
                    className="w-full h-16 text-lg font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all group"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                            Initializing...
                        </>
                    ) : (
                        <>
                            Start Extraction
                            <Sparkles className="ml-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}
