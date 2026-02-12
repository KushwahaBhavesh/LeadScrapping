/**
 * React hooks for lead management
 */

import { useState, useEffect, useCallback } from 'react';
import { apiClient, Lead, ExportLeadsRequest } from '@/lib/api/client';

export function useLeads(params?: {
  job_id?: string;
  status?: Lead['lead_status'];
  score_min?: number;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: params?.limit || 50,
    offset: params?.offset || 0,
    has_more: false,
  });

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.listLeads({
        job_id: params?.job_id,
        status: params?.status,
        score_min: params?.score_min,
        search: params?.search,
        limit: pagination.limit,
        offset: pagination.offset,
      });

      if (response.success && response.data) {
        setLeads(response.data);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      } else {
        setError(response.error?.message || 'Failed to fetch leads');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [
    params?.job_id,
    params?.status,
    params?.score_min,
    params?.search,
    pagination.limit,
    pagination.offset,
  ]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const nextPage = () => {
    if (pagination.has_more) {
      setPagination((prev) => ({
        ...prev,
        offset: prev.offset + prev.limit,
      }));
    }
  };

  const prevPage = () => {
    setPagination((prev) => ({
      ...prev,
      offset: Math.max(0, prev.offset - prev.limit),
    }));
  };

  const setPage = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      offset: page * prev.limit,
    }));
  };

  return {
    leads,
    loading,
    error,
    pagination,
    refetch: fetchLeads,
    nextPage,
    prevPage,
    setPage,
  };
}

export function useExportLeads() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportLeads = async (data: ExportLeadsRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.exportLeads(data);

      if (response.success && response.data) {
        // Download the file
        const filename = `leads-${Date.now()}.${data.format}`;
        apiClient.downloadFile(response.data, filename);
        return { success: true };
      } else {
        setError(response.error?.message || 'Failed to export leads');
        return { success: false, error: response.error };
      }
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: { code: 'unknown', message: err.message } };
    } finally {
      setLoading(false);
    }
  };

  return {
    exportLeads,
    loading,
    error,
  };
}
