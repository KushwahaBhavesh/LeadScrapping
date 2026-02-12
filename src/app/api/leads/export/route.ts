import { NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimiters } from '@/lib/middleware/rate-limit';
import { errorResponse } from '@/lib/utils/api-response';
import {
  createApiRoute,
  withAuth,
  withRateLimit,
  withValidation,
} from '@/lib/middleware/api-middleware';

// =====================================================
// VALIDATION SCHEMA
// =====================================================

const exportSchema = z.object({
  format: z.enum(['csv', 'json']),
  filters: z
    .object({
      job_id: z.string().uuid().optional(),
      score_min: z.number().min(0).max(100).optional(),
      status: z.enum(['hot', 'warm', 'cold']).optional(),
      created_after: z.string().datetime().optional(),
      created_before: z.string().datetime().optional(),
    })
    .optional(),
  fields: z.array(z.string()).optional(),
  limit: z.number().int().min(1).max(50000).default(10000),
});

// =====================================================
// HELPER FUNCTIONS
// =====================================================

function generateCSV(leads: any[], fields?: string[]): string {
  if (leads.length === 0) return '';

  const selectedFields = fields || Object.keys(leads[0]);
  const header = selectedFields.join(',');

  const rows = leads.map((lead) =>
    selectedFields
      .map((field) => {
        const value = lead[field];

        if (value === null || value === undefined) return '';
        if (Array.isArray(value)) {
          return `"${value.join('; ').replace(/"/g, '""')}"`;
        }
        if (typeof value === 'object') {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        }

        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }

        return stringValue;
      })
      .join(',')
  );

  return [header, ...rows].join('\n');
}

// =====================================================
// BUSINESS LOGIC
// =====================================================

async function exportLeads(req: Request, context: any) {
  const { user, supabase, validated } = context;

  // Build query
  let query = supabase.from('scraped_leads').select('*').eq('user_id', user.id);

  // Apply filters
  if (validated.filters?.job_id) {
    query = query.eq('job_id', validated.filters.job_id);
  }
  if (validated.filters?.score_min !== undefined) {
    query = query.gte('lead_score', validated.filters.score_min);
  }
  if (validated.filters?.status) {
    query = query.eq('lead_status', validated.filters.status);
  }
  if (validated.filters?.created_after) {
    query = query.gte('created_at', validated.filters.created_after);
  }
  if (validated.filters?.created_before) {
    query = query.lte('created_at', validated.filters.created_before);
  }

  query = query.limit(validated.limit);

  const { data: leads, error } = await query;

  if (error) throw error;

  if (!leads || leads.length === 0) {
    return errorResponse('no_data', 'No leads found matching the specified filters', 404);
  }

  // Format response
  if (validated.format === 'json') {
    return new NextResponse(JSON.stringify(leads, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="leads-${Date.now()}.json"`,
      },
    });
  }

  // CSV Export
  const csv = generateCSV(leads, validated.fields);

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="leads-${Date.now()}.csv"`,
    },
  });
}

// =====================================================
// ROUTE HANDLER
// =====================================================

export const POST = createApiRoute(exportLeads, [
  withAuth(),
  withRateLimit(rateLimiters.export),
  withValidation(exportSchema, 'body'),
]);
