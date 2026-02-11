'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Zap, Activity, Target, Globe, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
    {
        name: 'Total Extractions',
        value: '2,547',
        change: '+12.5%',
        icon: Target,
        description: 'Last 30 days'
    },
    {
        name: 'Active Engines',
        value: '12',
        change: '+2',
        icon: Globe,
        description: 'Operational'
    },
    {
        name: 'Success Rate',
        value: '99.4%',
        change: '+0.2%',
        icon: Zap,
        description: 'Average'
    },
    {
        name: 'Credits Remain',
        value: '4,231',
        change: '-124',
        icon: Activity,
        description: 'Auto-refill active'
    },
];

export function DashboardContent({ userName }: { userName: string }) {
    return (
        <div className="py-10 space-y-10 px-4 md:px-8">
            {/* Clean Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Welcome back, {userName}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Here's what's happening with your extraction fleet today.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl font-semibold">
                        View Analytics
                    </Button>
                    <Button className="rounded-xl px-6 font-semibold gap-2">
                        <Plus className="h-4 w-4" />
                        New Engine
                    </Button>
                </div>
            </div>

            {/* Simple Balanced Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <Card className="border-gray-200 dark:border-white/5 bg-white dark:bg-gray-950 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {stat.name}
                                </CardTitle>
                                <stat.icon className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                                <p className="text-xs text-emerald-500 font-semibold mt-1 flex items-center gap-1">
                                    {stat.change}
                                    <span className="text-gray-400 font-normal ml-1">since yesterday</span>
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Action Card */}
                <Card className="lg:col-span-2 border-none bg-primary text-white rounded-3xl overflow-hidden shadow-lg p-8 relative">
                    <div className="relative z-10 space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tight">Scale your discovery with AI</h2>
                            <p className="text-white/80 text-lg max-w-md">
                                Deploy highly targeted scrapers using our advanced pattern recognition engine.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button className="bg-white text-primary hover:bg-gray-100 rounded-xl font-bold">
                                Get Started
                            </Button>
                            <Button variant="ghost" className="text-white hover:bg-white/10 rounded-xl font-bold">
                                Documentation
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Status Card */}
                <Card className="border-gray-200 dark:border-white/5 bg-white dark:bg-gray-950 rounded-3xl shadow-sm p-8 flex flex-col justify-between">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                            System Stable
                        </div>
                        <h3 className="text-xl font-bold">Security Shield</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                            Your proxy pool is healthy and operating at 100% efficiency. No blocking detected.
                        </p>
                    </div>
                    <Button variant="ghost" className="w-full justify-between rounded-xl group hover:bg-gray-50 dark:hover:bg-gray-900 px-4">
                        Manage Proxies
                        <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </Button>
                </Card>
            </div>

            {/* Recent Activity Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Recent Maneuvers</h3>
                    <Button variant="link" className="text-primary font-semibold">View All</Button>
                </div>
                <Card className="border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-gray-900/50 rounded-3xl p-12 text-center">
                    <div className="flex flex-col items-center gap-4 text-gray-400">
                        <Activity className="h-10 w-10 opacity-20" />
                        <span className="font-semibold text-sm tracking-wide">No recent background activity to report</span>
                    </div>
                </Card>
            </div>
        </div>
    );
}
