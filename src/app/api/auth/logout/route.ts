import { createClient } from '@/lib/supabase/server';
import { createApiRoute } from '@/lib/middleware/api-middleware';
import { withAuth } from '@/lib/middleware/api-middleware';
import { withErrorHandler } from '@/lib/middleware/api-middleware';
import { successResponse, errorResponse } from '@/lib/utils/api-response';
import type { ApiHandler } from '@/lib/middleware/api-middleware';

// =====================================================
// HANDLER
// =====================================================

const handler: ApiHandler = async (req: Request, context?: any) => {
  try {
    const supabase = context?.supabase || (await createClient());

    // Sign out the user
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Logout error:', error);
      return errorResponse(error.message, 'logout_failed', 500);
    }

    // Success response
    return successResponse(
      {
        message: 'Logout successful',
      },
      200
    );
  } catch (err) {
    console.error('Logout error:', err);
    return errorResponse('An unexpected error occurred during logout', 'internal_error', 500);
  }
};

// =====================================================
// EXPORT ROUTE
// =====================================================

export const POST = createApiRoute(handler, [
  withAuth(), // Requires authentication
  withErrorHandler(),
]);
