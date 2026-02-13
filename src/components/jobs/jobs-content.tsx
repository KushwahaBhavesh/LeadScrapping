'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Play, Pause, RotateCcw, Trash2, ExternalLink, Activity, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useJobs } from '@/hooks/use-jobs';
import { Job } from '@/lib/api/client';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

export function JobsContent() {
  const router = useRouter();
  const { jobs, loading, error, refetch } = useJobs({ autoRefresh: true, refreshInterval: 5000 });

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'completed':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'pending':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'failed':
      case 'cancelled':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getProgressColor = (status: Job['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-primary';
      case 'completed':
        return 'bg-emerald-500';
      case 'pending':
        return 'bg-amber-500';
      case 'failed':
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-muted-foreground';
    }
  };

  const getTypeIcon = (type: Job['type']) => {
    switch (type) {
      case 'bulk':
        return <Zap className="h-5 w-5" />;
      case 'sitemap':
        return <Activity className="h-5 w-5" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };

  const calculateProgress = (job: Job) => {
    if (job.total_urls === 0) return 0;
    return Math.round((job.processed_urls / job.total_urls) * 100);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="space-y-6 w-full px-4 md:px-0 py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Scraping Jobs</h1>
          <p className="text-sm text-muted-foreground">
            Monitor and manage your active scraping processes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="h-10 w-64 bg-muted border border-border rounded-lg pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-all font-medium"
            />
          </div>
          <Button variant="outline" className="h-10" onClick={refetch}>
            Refresh
          </Button>
          <Button
            className="h-10 px-6 font-semibold"
            onClick={() => router.push('/dashboard/scrapping')}
          >
            New Job
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {loading && jobs.length === 0 && (
        <Card className="border-border bg-card p-20">
          <div className="flex flex-col items-center justify-center">
            <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4 animate-pulse">
              <Activity className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">Loading jobs...</p>
          </div>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Card className="border-red-500/20 bg-red-500/5 p-6">
          <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
        </Card>
      )}

      {/* Table */}
      {!loading && jobs.length > 0 && (
        <Card className="border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="p-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                    Job Details
                  </th>
                  <th className="p-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                    Status
                  </th>
                  <th className="hidden sm:table-cell p-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                    Progress
                  </th>
                  <th className="hidden lg:table-cell p-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-center">
                    Leads
                  </th>
                  <th className="hidden md:table-cell p-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                    Started
                  </th>
                  <th className="p-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'h-9 w-9 rounded-lg flex items-center justify-center shrink-0 border border-border/50',
                            job.status === 'processing'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          )}
                        >
                          {getTypeIcon(job.type)}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <p className="text-sm font-bold text-foreground truncate uppercase tracking-tighter">
                            #{job.id.slice(0, 8)}
                          </p>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest leading-none truncate opacity-60">
                            {job.type}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-[9px] font-black uppercase tracking-[0.1em] h-6 px-2 italic border-2 rounded-lg',
                          getStatusColor(job.status)
                        )}
                      >
                        {job.status}
                      </Badge>
                    </td>
                    <td className="hidden sm:table-cell p-4">
                      <div className="w-full max-w-[120px] space-y-1.5">
                        <div className="flex justify-between items-center text-[10px] font-black text-muted-foreground tabular-nums">
                          <span>{calculateProgress(job)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden border border-border/50">
                          <div
                            style={{ width: `${calculateProgress(job)}%` }}
                            className={cn(
                              'h-full rounded-full transition-all duration-500',
                              getProgressColor(job.status)
                            )}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="hidden lg:table-cell p-4 text-center">
                      <span className="text-base font-black text-foreground tabular-nums tracking-tighter">
                        {job.leads_found}
                      </span>
                    </td>
                    <td className="hidden md:table-cell p-4">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">
                        {formatTimeAgo(job.created_at)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        {job.status === 'pending' || job.status === 'failed' ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 md:h-8 md:w-8 text-muted-foreground hover:text-emerald-500 transition-colors"
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        ) : job.status === 'processing' ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 md:h-8 md:w-8 text-muted-foreground hover:text-amber-500 transition-colors"
                          >
                            <Pause className="h-4 w-4" />
                          </Button>
                        ) : null}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 md:h-8 md:w-8 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 md:h-8 md:w-8 text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => router.push(`/dashboard/leads?job_id=${job.id}`)}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 md:h-8 md:w-8 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Empty State */}
      {!loading && !error && jobs.length === 0 && (
        <Card className="border-border bg-card">
          <div className="flex flex-col items-center justify-center py-20 bg-muted/10">
            <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Activity className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground">No jobs found</h3>
            <p className="text-muted-foreground text-sm mt-1">
              Start a new scraping job to see it here
            </p>
            <Button
              className="mt-6 font-semibold"
              onClick={() => router.push('/dashboard/scrapping')}
            >
              Create First Job
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
