'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Upload, FileText, AlertCircle, CheckCircle2, XCircle, Sparkles, Hash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface UrlValidationResult {
    url: string;
    isValid: boolean;
    error?: string;
}

export function BulkUrlForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [urls, setUrls] = useState<string>('');
    const [validationResults, setValidationResults] = useState<UrlValidationResult[]>([]);
    const [creditEstimate, setCreditEstimate] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateUrls = (urlList: string[]) => {
        const results: UrlValidationResult[] = urlList.map((url) => {
            const trimmed = url.trim();
            if (!trimmed) {
                return { url: trimmed, isValid: false, error: 'Empty URL' };
            }
            try {
                new URL(trimmed);
                return { url: trimmed, isValid: true };
            } catch {
                return { url: trimmed, isValid: false, error: 'Invalid URL format' };
            }
        });
        setValidationResults(results);

        const validCount = results.filter((r) => r.isValid).length;
        setCreditEstimate(validCount + Math.floor(validCount * 0.5));
    };

    const handleTextareaChange = (value: string) => {
        setUrls(value);
        const urlList = value.split('\n').filter((line) => line.trim());
        if (urlList.length > 0) {
            validateUrls(urlList);
        } else {
            setValidationResults([]);
            setCreditEstimate(0);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const text = await file.text();
        const lines = text.split('\n').filter((line) => line.trim());

        const urlList = lines.slice(1).map((line) => {
            const columns = line.split(',');
            return columns[0]?.trim() || '';
        });

        setUrls(urlList.join('\n'));
        validateUrls(urlList);
    };

    const handleSubmit = async () => {
        const validUrls = validationResults.filter((r) => r.isValid).map((r) => r.url);

        if (validUrls.length === 0) {
            alert('Please add at least one valid URL');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/scrapping', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobType: 'bulk',
                    urls: validUrls,
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

    const validCount = validationResults.filter((r) => r.isValid).length;
    const invalidCount = validationResults.filter((r) => !r.isValid).length;

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <Label className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Method 1: File Import
                    </Label>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="csv-upload"
                    />
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative h-full flex flex-col"
                    >
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex-1 min-h-[160px] border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                        >
                            <div className="h-14 w-14 rounded-2xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Upload className="h-6 w-6 text-gray-400 group-hover:text-primary transition-colors" />
                            </div>
                            <div className="text-center">
                                <span className="block text-base font-bold text-gray-900 dark:text-white">Upload CSV Resource</span>
                                <span className="block text-xs text-gray-500 font-medium">Drag and drop or click to browse</span>
                            </div>
                        </Button>
                    </motion.div>
                </div>

                <div className="space-y-4">
                    <Label className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Method 2: Manual Entry
                    </Label>
                    <div className="relative group">
                        <Textarea
                            id="urls"
                            placeholder="https://company-a.com&#10;https://company-b.com&#10;https://company-c.com"
                            className="min-h-[160px] font-mono text-sm rounded-3xl border-2 border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-black/50 p-6 focus:ring-4 focus:ring-primary/10 transition-all resize-none"
                            value={urls}
                            onChange={(e) => handleTextareaChange(e.target.value)}
                        />
                        <div className="absolute bottom-4 right-4 h-8 px-3 rounded-lg bg-white dark:bg-gray-900 border border-black/5 dark:border-white/10 flex items-center justify-center pointer-events-none">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                                <Hash className="h-3 w-3" />
                                {urls.split('\n').filter(l => l.trim()).length} URLs
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {validationResults.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/10 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    </div>
                                    <span className="text-sm font-bold text-green-700 dark:text-green-400 uppercase tracking-tight">Valid Segments</span>
                                </div>
                                <span className="text-xl font-black text-green-600">{validCount}</span>
                            </div>

                            <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                                        <XCircle className="h-4 w-4 text-red-500" />
                                    </div>
                                    <span className="text-sm font-bold text-red-700 dark:text-red-400 uppercase tracking-tight">Invalid Noise</span>
                                </div>
                                <span className="text-xl font-black text-red-600">{invalidCount}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {validCount > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Alert className="border-primary/20 bg-primary/5 dark:bg-primary/10 rounded-2xl p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Sparkles className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">Batch Credit Estimate</p>
                                        <p className="text-xs text-gray-500 font-medium">Processing {validCount} verified endpoints</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-black text-primary">~{creditEstimate}</span>
                                    <span className="text-xs font-bold text-gray-400 ml-1 uppercase tracking-tighter">Credits</span>
                                </div>
                            </div>
                        </Alert>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="pt-2">
                <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting || validCount === 0}
                    className="w-full h-16 text-lg font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all group"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                            Launching...
                        </>
                    ) : (
                        <>
                            Launch Bulk Extraction
                            <Sparkles className="ml-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
