'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SingleUrlForm } from '@/components/scrapping/single-url-form';
import { BulkUrlForm } from '@/components/scrapping/bulk-url-form';
import { SitemapForm } from '@/components/scrapping/sitemap-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Files, Map, Zap } from 'lucide-react';

export function ScrappingInterface() {
    const [activeTab, setActiveTab] = useState('single');

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
        }
    };

    const tabVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as const }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8 max-w-6xl mx-auto"
        >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                        <Zap className="h-3 w-3 fill-primary" />
                        AI Extraction Engine
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                        New Scrapping <span className="text-primary italic">Job</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                        Turn any website into a high-fidelity data source in seconds.
                    </p>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex items-center justify-center sm:justify-start mb-8 overflow-x-auto pb-2 scrollbar-none">
                    <TabsList className="bg-gray-100/50 dark:bg-gray-900/50 backdrop-blur-sm p-1.5 rounded-2xl border border-gray-200 dark:border-gray-800">
                        <TabsTrigger
                            value="single"
                            className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-lg data-[state=active]:text-primary transition-all duration-300"
                        >
                            <Globe className="h-4 w-4 mr-2" />
                            <span className="font-bold">Single URL</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="bulk"
                            className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-lg data-[state=active]:text-primary transition-all duration-300"
                        >
                            <Files className="h-4 w-4 mr-2" />
                            <span className="font-bold">Bulk URLs</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="sitemap"
                            className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-lg data-[state=active]:text-primary transition-all duration-300"
                        >
                            <Map className="h-4 w-4 mr-2" />
                            <span className="font-bold">Sitemap</span>
                        </TabsTrigger>
                    </TabsList>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial="hidden"
                        animate="visible"
                        variants={tabVariants}
                    >
                        <TabsContent value="single" className="mt-0 outline-none">
                            <Card className="border-gray-200 dark:border-gray-800 shadow-2xl rounded-[32px] overflow-hidden glass bg-white/40 dark:bg-gray-950/40 backdrop-blur-xl">
                                <CardHeader className="p-8 pb-4">
                                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                                        <Globe className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-2xl font-black uppercase tracking-tight">Precision Scraping</CardTitle>
                                    <CardDescription className="text-base font-medium">
                                        Extract granular data from a specific target page.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-8 pt-4">
                                    <SingleUrlForm />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="bulk" className="mt-0 outline-none">
                            <Card className="border-gray-200 dark:border-gray-800 shadow-2xl rounded-[32px] overflow-hidden glass bg-white/40 dark:bg-gray-950/40 backdrop-blur-xl">
                                <CardHeader className="p-8 pb-4">
                                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                                        <Files className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-2xl font-black uppercase tracking-tight">Batch Processing</CardTitle>
                                    <CardDescription className="text-base font-medium">
                                        Scale your extraction horizontally with up to 1,000 URLs.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-8 pt-4">
                                    <BulkUrlForm />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="sitemap" className="mt-0 outline-none">
                            <Card className="border-gray-200 dark:border-gray-800 shadow-2xl rounded-[32px] overflow-hidden glass bg-white/40 dark:bg-gray-950/40 backdrop-blur-xl">
                                <CardHeader className="p-8 pb-4">
                                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                                        <Map className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-2xl font-black uppercase tracking-tight">Deep Crawler</CardTitle>
                                    <CardDescription className="text-base font-medium">
                                        Automatically map and extract from entire domain structures.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-8 pt-4">
                                    <SitemapForm />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </motion.div>
                </AnimatePresence>
            </Tabs>
        </motion.div>
    );
}
