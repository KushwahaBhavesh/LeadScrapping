'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Filter, Download, MoreVertical, Building2, ExternalLink, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useLeads, useExportLeads } from '@/hooks/use-leads';
import { Lead } from '@/lib/api/client';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';

export function LeadsContent() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('job_id') || undefined;
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [statusFilter, setStatusFilter] = useState<Lead['lead_status'] | undefined>();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const { leads, loading, error, pagination, nextPage, prevPage } = useLeads({
    job_id: jobId,
    search: searchQuery,
    status: statusFilter,
    limit: 50,
  });

  const { exportLeads, loading: exporting } = useExportLeads();

  const handleExport = async (format: 'csv' | 'json') => {
    const result = await exportLeads({
      format,
      filters: {
        job_id: jobId,
        status: statusFilter,
      },
    });

    if (result.success) {
      toast.success(`Leads exported as ${format.toUpperCase()}`, {
        description: 'Download started',
      });
    }
  };

  const getStatusColor = (status: Lead['lead_status']) => {
    switch (status) {
      case 'hot':
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'warm':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'cold':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-red-600 dark:text-red-400';
    if (score >= 40) return 'text-amber-600 dark:text-amber-400';
    return 'text-blue-600 dark:text-blue-400';
  };

  return (
    <div className="space-y-6 w-full px-4 md:px-0 py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Lead Database</h1>
          <p className="text-sm text-muted-foreground">
            {pagination.total} qualified leads ready for outreach
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-10 gap-2"
            onClick={() => handleExport('csv')}
            disabled={exporting || leads.length === 0}
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button
            variant="outline"
            className="h-10 gap-2"
            onClick={() => handleExport('json')}
            disabled={exporting || leads.length === 0}
          >
            <Download className="h-4 w-4" />
            Export JSON
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by email, company, or name..."
            className="pl-10 h-11 bg-muted border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-11 gap-2 min-w-[140px]">
              <Filter className="h-4 w-4" />
              {statusFilter
                ? statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)
                : 'All Status'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setStatusFilter(undefined)}>
              All Status
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('hot')}>Hot</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('warm')}>Warm</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('cold')}>Cold</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Loading State */}
      {loading && leads.length === 0 && (
        <Card className="border-border bg-card p-20">
          <div className="flex flex-col items-center justify-center">
            <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4 animate-pulse">
              <Zap className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">Loading leads...</p>
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
      {!loading && leads.length > 0 && (
        <Card className="border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="p-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                    Contact
                  </th>
                  <th className="hidden sm:table-cell p-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                    Company
                  </th>
                  <th className="hidden lg:table-cell p-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                    Industry
                  </th>
                  <th className="hidden lg:table-cell p-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-center">
                    Score
                  </th>
                  <th className="p-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                    Status
                  </th>
                  <th className="hidden lg:table-cell p-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                    Signals
                  </th>
                  <th className="p-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-muted/30 transition-colors group cursor-pointer"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <td className="p-4">
                      <div className="flex flex-col gap-0.5">
                        <p className="text-sm font-bold text-foreground truncate max-w-[150px] sm:max-w-none">
                          {lead.email}
                        </p>
                        <div className="flex items-center gap-2">
                          {lead.full_name && (
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">
                              {lead.full_name}
                            </p>
                          )}
                          <span className="sm:hidden text-[10px] text-primary/40 font-black px-1.5 py-0.5 bg-muted rounded">
                            {lead.company_name || 'Personal'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0 border border-border/50">
                          <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                        <span className="text-xs font-bold text-foreground uppercase tracking-tight">
                          {lead.company_name || 'Unknown'}
                        </span>
                      </div>
                    </td>
                    <td className="hidden lg:table-cell p-4">
                      {lead.tags?.[0] ? (
                        <Badge variant="outline" className="text-[10px]">
                          {lead.tags[0]}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-[10px]">-</span>
                      )}
                    </td>
                    <td className="hidden lg:table-cell p-4 text-center">
                      <span
                        className={`text-xl font-black tabular-nums tracking-tighter ${getScoreColor(lead.lead_score)}`}
                      >
                        {lead.lead_score}
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant="outline"
                        className={`text-[9px] font-black uppercase tracking-[0.1em] h-6 px-2 italic border-2 rounded-lg ${getStatusColor(lead.lead_status)}`}
                      >
                        {lead.lead_status}
                      </Badge>
                    </td>
                    <td className="hidden lg:table-cell p-4">
                      <div className="flex flex-wrap gap-1">
                        {lead.signals_detected.slice(0, 2).map((signal, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-[8px] font-black uppercase tracking-tight px-2 py-0.5 bg-muted border-none"
                          >
                            {signal.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        {lead.source_url && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => window.open(lead.source_url, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => navigator.clipboard.writeText(lead.email)}
                            >
                              Copy Email
                            </DropdownMenuItem>
                            {lead.linkedin_url && (
                              <DropdownMenuItem
                                onClick={() => window.open(lead.linkedin_url!, '_blank')}
                              >
                                View LinkedIn
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => setSelectedLead(lead)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Delete Lead
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="border-t border-border p-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {pagination.offset + 1} to{' '}
              {Math.min(pagination.offset + pagination.limit, pagination.total)} of{' '}
              {pagination.total} leads
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="default" // default is h-10 for touch
                className="md:h-9 md:px-3 text-sm h-10 px-4"
                onClick={prevPage}
                disabled={pagination.offset === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="default"
                className="md:h-9 md:px-3 text-sm h-10 px-4"
                onClick={nextPage}
                disabled={!pagination.has_more}
              >
                Next
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Empty State */}
      {!loading && !error && leads.length === 0 && (
        <Card className="border-border bg-card">
          <div className="flex flex-col items-center justify-center py-20 bg-muted/10">
            <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Zap className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground">No leads found</h3>
            <p className="text-muted-foreground text-sm mt-1">
              {searchQuery || statusFilter
                ? 'Try adjusting your filters'
                : 'Start scraping to generate leads'}
            </p>
          </div>
        </Card>
      )}

      {/* Lead Details Sheet */}
      <Sheet open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader className="text-left space-y-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl font-black uppercase tracking-tighter">
                Lead Intelligence
              </SheetTitle>
              <Badge
                variant="outline"
                className={`text-[10px] font-black uppercase tracking-[0.1em] h-6 px-2 italic border-2 rounded-lg ${selectedLead ? getStatusColor(selectedLead.lead_status) : ''
                  }`}
              >
                {selectedLead?.lead_status}
              </Badge>
            </div>
          </SheetHeader>

          {selectedLead && (
            <div className="mt-8 space-y-8">
              {/* Score Card */}
              <div className="p-6 rounded-2xl bg-muted/30 border border-border space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Purchase Intent Score
                  </span>
                  <span
                    className={`text-4xl font-black tabular-nums tracking-tighter ${getScoreColor(selectedLead.lead_score)}`}
                  >
                    {selectedLead.lead_score}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedLead.signals_detected.map((signal, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-background border border-border text-foreground px-3 py-1 text-xs"
                    >
                      {signal.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Company Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Target Entity
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-muted/20 border border-border">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Company Name
                    </p>
                    <p className="font-semibold text-foreground">
                      {selectedLead.company_name || 'N/A'}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/20 border border-border">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Industry
                    </p>
                    <p className="font-semibold text-foreground">
                      {selectedLead.tags?.[0] || 'Unidentified'}
                    </p>
                  </div>
                </div>
              </div>

              {/* AI Analysis */}
              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  AI Analysis
                </h3>
                <div className="p-4 rounded-xl bg-muted/20 border border-border">
                  <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                    {selectedLead.qualification_notes || 'No analysis available.'}
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-muted-foreground">
                  Contact Coordinates
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <span className="text-sm text-muted-foreground">Email</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{selectedLead.email}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => {
                          navigator.clipboard.writeText(selectedLead.email);
                          toast.success('Copied to clipboard');
                        }}
                      >
                        <Download className="h-3 w-3 rotate-180" />{' '}
                        {/* Using Download as copy icon alternative since no Copy icon imported yet, or just add Copy import */}
                      </Button>
                    </div>
                  </div>
                  {selectedLead.source_url && (
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <span className="text-sm text-muted-foreground">Source</span>
                      <a
                        href={selectedLead.source_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                      >
                        Visit Website <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
