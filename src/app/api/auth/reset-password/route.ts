import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { createApiRoute } from '@/lib/middleware/api-middleware';
import { withValidation } from '@/lib/middleware/api-middleware';
import { withRateLimit } from '@/lib/middleware/api-middleware';
import { withErrorHandler } from '@/lib/middleware/api-middleware';
import { successResponse } from '@/lib/utils/api-response';
import type { ApiHandler } from '@/lib/middleware/api-middleware';

// =====================================================
// VALIDATION SCHEMAS
// =====================================================

const resetPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});

// =====================================================
// RATE LIMITERS
// =====================================================

const rateLimiters = {
    resetPassword: {
        requests: 3,
        window: 60 * 60, // 3 requests per hour
    },
};

// =====================================================
// HANDLER
// =====================================================

const handler: ApiHandler = async (req: Request, context?: any) => {
    const { email } = context.validated;

    try {
        const supabase = await createClient();

        // Send password reset email
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        });

        if (error) {
            console.error('Password reset error:', error);
            // Don't reveal if email exists or not for security
            // Return success anyway
        }

        // Always return success to prevent email enumeration
        return successResponse(
            {
                message: 'If an account exists with this email, you will receive a password reset link.',
            },
            200
        );
    } catch (err) {
        console.error('Password reset error:', err);
        // Still return success to prevent email enumeration
        return successResponse(
            {
                message: 'If an account exists with this email, you will receive a password reset link.',
            },
            200
        );
    }
};

// =====================================================
// EXPORT ROUTE
// =====================================================

export const POST = createApiRoute(handler, [
    withRateLimit(rateLimiters.resetPassword),
    withValidation(resetPasswordSchema, 'body'),
    withErrorHandler(),
]);
