import { create } from 'zustand';

export interface Lead {
    id: string;
    job_id: string;
    user_id: string;
    organization_id?: string;

    // Contact information
    email?: string;
    phone?: string;
    full_name?: string;
    company_name?: string;
    job_title?: string;

    // Social profiles
    linkedin_url?: string;
    twitter_url?: string;
    facebook_url?: string;

    // Lead qualification
    lead_score?: number;
    lead_status: 'hot' | 'warm' | 'cold';
    qualification_notes?: string;

    // Metadata
    source_url: string;
    scraped_at: string;
    enriched_at?: string;
    metadata?: Record<string, any>;

    created_at: string;
    updated_at: string;
}

export interface LeadFilters {
    search?: string;
    scoreMin?: number;
    scoreMax?: number;
    status?: ('hot' | 'warm' | 'cold')[];
    dateFrom?: string;
    dateTo?: string;
    jobId?: string;
}

interface LeadsState {
    leads: Lead[];
    selectedLeads: string[];
    filters: LeadFilters;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    currentPage: number;
    pageSize: number;
    totalCount: number;
    isLoading: boolean;
    error: string | null;

    // Actions
    setLeads: (leads: Lead[], totalCount: number) => void;
    addLead: (lead: Lead) => void;
    updateLead: (id: string, updates: Partial<Lead>) => void;
    deleteLead: (id: string) => void;
    setSelectedLeads: (ids: string[]) => void;
    toggleLeadSelection: (id: string) => void;
    selectAllLeads: () => void;
    clearSelection: () => void;
    setFilters: (filters: Partial<LeadFilters>) => void;
    clearFilters: () => void;
    setSorting: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
    setPage: (page: number) => void;
    setPageSize: (size: number) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useLeadsStore = create<LeadsState>((set) => ({
    leads: [],
    selectedLeads: [],
    filters: {},
    sortBy: 'created_at',
    sortOrder: 'desc',
    currentPage: 1,
    pageSize: 50,
    totalCount: 0,
    isLoading: false,
    error: null,

    setLeads: (leads, totalCount) => set({ leads, totalCount }),

    addLead: (lead) =>
        set((state) => ({
            leads: [lead, ...state.leads],
            totalCount: state.totalCount + 1,
        })),

    updateLead: (id, updates) =>
        set((state) => ({
            leads: state.leads.map((lead) =>
                lead.id === id ? { ...lead, ...updates } : lead
            ),
        })),

    deleteLead: (id) =>
        set((state) => ({
            leads: state.leads.filter((lead) => lead.id !== id),
            selectedLeads: state.selectedLeads.filter((leadId) => leadId !== id),
            totalCount: state.totalCount - 1,
        })),

    setSelectedLeads: (ids) => set({ selectedLeads: ids }),

    toggleLeadSelection: (id) =>
        set((state) => ({
            selectedLeads: state.selectedLeads.includes(id)
                ? state.selectedLeads.filter((leadId) => leadId !== id)
                : [...state.selectedLeads, id],
        })),

    selectAllLeads: () =>
        set((state) => ({
            selectedLeads: state.leads.map((lead) => lead.id),
        })),

    clearSelection: () => set({ selectedLeads: [] }),

    setFilters: (filters) =>
        set((state) => ({
            filters: { ...state.filters, ...filters },
            currentPage: 1, // Reset to first page when filters change
        })),

    clearFilters: () => set({ filters: {}, currentPage: 1 }),

    setSorting: (sortBy, sortOrder) => set({ sortBy, sortOrder }),

    setPage: (page) => set({ currentPage: page }),

    setPageSize: (size) => set({ pageSize: size, currentPage: 1 }),

    setLoading: (loading) => set({ isLoading: loading }),

    setError: (error) => set({ error }),
}));
