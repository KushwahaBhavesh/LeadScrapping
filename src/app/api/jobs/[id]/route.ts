import { JobService } from '@/lib/services/job-service';
import { successResponse, notFoundResponse } from '@/lib/utils/api-response';
import { createApiRoute, withAuth } from '@/lib/middleware/api-middleware';

// =====================================================
// BUSINESS LOGIC
// =====================================================

async function getJobById(req: Request, context: any) {
  const { user, supabase, params } = context;

  const job = await JobService.getJob(supabase, params.id, user.id);

  if (!job) {
    return notFoundResponse('Job');
  }

  return successResponse(job);
}

// =====================================================
// ROUTE HANDLER
// =====================================================

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const handler = createApiRoute(getJobById, [withAuth()]);

  return handler(req, { params: resolvedParams });
}
