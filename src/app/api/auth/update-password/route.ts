import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { createApiRoute } from '@/lib/middleware/api-middleware';
import { withAuth } from '@/lib/middleware/api-middleware';
import { withValidation } from '@/lib/middleware/api-middleware';
import { withErrorHandler } from '@/lib/middleware/api-middleware';
import { successResponse, errorResponse } from '@/lib/utils/api-response';
import type { ApiHandler } from '@/lib/middleware/api-middleware';

// =====================================================
// VALIDATION SCHEMAS
// =====================================================

const updatePasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long'),
});

// =====================================================
// HANDLER
// =====================================================

const handler: ApiHandler = async (req: Request, context?: any) => {
  const { newPassword } = context.validated;
  const supabase = context?.supabase || (await createClient());

  try {
    // Update user password
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error('Update password error:', error);
      return errorResponse(error.message, 'update_password_failed', 400);
    }

    // Success response
    return successResponse(
      {
        message: 'Password updated successfully',
      },
      200
    );
  } catch (err) {
    console.error('Update password error:', err);
    return errorResponse(
      'An unexpected error occurred while updating password',
      'internal_error',
      500
    );
  }
};

// =====================================================
// EXPORT ROUTE
// =====================================================

export const POST = createApiRoute(handler, [
  withAuth(), // Requires authentication
  withValidation(updatePasswordSchema, 'body'),
  withErrorHandler(),
]);
