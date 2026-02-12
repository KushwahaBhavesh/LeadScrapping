/**
 * React hooks for job management
 */

import { useState, useEffect, useCallback } from 'react';
import { apiClient, Job, CreateJobRequest } from '@/lib/api/client';

export function useJobs(params?: {
  status?: Job['status'];
  type?: Job['type'];
  autoRefresh?: boolean;
  refreshInterval?: number;
}) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 50,
    offset: 0,
    has_more: false,
  });

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.listJobs({
        status: params?.status,
        type: params?.type,
        limit: pagination.limit,
        offset: pagination.offset,
      });

      if (response.success && response.data) {
        setJobs(response.data);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      } else {
        setError(response.error?.message || 'Failed to fetch jobs');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [params?.status, params?.type, pagination.limit, pagination.offset]);

  useEffect(() => {
    fetchJobs();

    // Auto-refresh if enabled
    if (params?.autoRefresh) {
      const interval = setInterval(fetchJobs, params.refreshInterval || 5000);
      return () => clearInterval(interval);
    }
  }, [fetchJobs, params?.autoRefresh, params?.refreshInterval]);

  return {
    jobs,
    loading,
    error,
    pagination,
    refetch: fetchJobs,
  };
}

export function useJob(jobId: string, autoRefresh = false) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJob = useCallback(async () => {
    if (!jobId) return;

    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.getJob(jobId);

      if (response.success && response.data) {
        setJob(response.data);
      } else {
        setError(response.error?.message || 'Failed to fetch job');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    fetchJob();

    // Auto-refresh for running jobs
    if (autoRefresh && job?.status === 'processing') {
      const interval = setInterval(fetchJob, 3000);
      return () => clearInterval(interval);
    }
  }, [fetchJob, autoRefresh, job?.status]);

  return {
    job,
    loading,
    error,
    refetch: fetchJob,
  };
}

export function useCreateJob() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createJob = async (data: CreateJobRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.createJob(data);

      if (response.success && response.data) {
        return { success: true, data: response.data };
      } else {
        setError(response.error?.message || 'Failed to create job');
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
    createJob,
    loading,
    error,
  };
}
