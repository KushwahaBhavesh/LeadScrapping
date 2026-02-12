import { z } from 'zod';
import { rateLimiters } from '@/lib/middleware/rate-limit';
import { paginatedResponse } from '@/lib/utils/api-response';
import {
  createApiRoute,
  withAuth,
  withRateLimit,
  withValidation,
} from '@/lib/middleware/api-middleware';

// =====================================================
// VALIDATION SCHEMA
// =====================================================

const querySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
  status: z.enum(['pending', 'processing', 'completed', 'failed', 'cancelled']).optional(),
  type: z.enum(['single', 'bulk', 'sitemap']).optional(),
  sort_by: z.enum(['created_at', 'completed_at']).default('created_at'),
  sort_order: z.enum(['asc', 'desc']).default('desc'),
});

// =====================================================
// BUSINESS LOGIC
// =====================================================

async function listJobs(req: Request, context: any) {
  const { user, supabase, validated } = context;

  // Build query
  let query = supabase.from('scraping_jobs').select('*', { count: 'exact' }).eq('user_id', user.id);

  // Apply filters
  if (validated.status) {
    query = query.eq('status', validated.status);
  }

  if (validated.type) {
    query = query.eq('type', validated.type);
  }

  // Apply sorting
  query = query.order(validated.sort_by, { ascending: validated.sort_order === 'asc' });

  // Apply pagination
  const {
    data: jobs,
    count,
    error,
  } = await query.range(validated.offset, validated.offset + validated.limit - 1);

  if (error) throw error;

  return paginatedResponse(jobs || [], {
    total: count || 0,
    limit: validated.limit,
    offset: validated.offset,
  });
}

// =====================================================
// ROUTE HANDLER
// =====================================================

export const GET = createApiRoute(listJobs, [
  withAuth(),
  withRateLimit(rateLimiters.authenticated),
  withValidation(querySchema, 'query'),
]);
