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
  job_id: z.string().uuid().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
  search: z.string().optional(),
  status: z.enum(['hot', 'warm', 'cold']).optional(),
  score_min: z.coerce.number().min(0).max(100).optional(),
  sort_by: z.enum(['created_at', 'lead_score', 'company_name']).default('created_at'),
  sort_order: z.enum(['asc', 'desc']).default('desc'),
});

// =====================================================
// BUSINESS LOGIC
// =====================================================

async function getLeads(req: Request, context: any) {
  const { user, supabase, validated } = context;

  // Build query
  let query = supabase.from('scraped_leads').select('*', { count: 'exact' }).eq('user_id', user.id);

  // Apply filters
  if (validated.job_id) {
    query = query.eq('job_id', validated.job_id);
  }

  if (validated.status) {
    query = query.eq('lead_status', validated.status);
  }

  if (validated.score_min !== undefined) {
    query = query.gte('lead_score', validated.score_min);
  }

  if (validated.search) {
    query = query.or(
      `email.ilike.%${validated.search}%,company_name.ilike.%${validated.search}%,full_name.ilike.%${validated.search}%`
    );
  }

  // Apply sorting
  query = query.order(validated.sort_by, { ascending: validated.sort_order === 'asc' });

  // Apply pagination
  const {
    data: leads,
    count,
    error,
  } = await query.range(validated.offset, validated.offset + validated.limit - 1);

  if (error) throw error;

  return paginatedResponse(leads || [], {
    total: count || 0,
    limit: validated.limit,
    offset: validated.offset,
  });
}

// =====================================================
// ROUTE HANDLER
// =====================================================

export const GET = createApiRoute(getLeads, [
  withAuth(),
  withRateLimit(rateLimiters.authenticated),
  withValidation(querySchema, 'query'),
]);
