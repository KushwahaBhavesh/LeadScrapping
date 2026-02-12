import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { createApiRoute } from '@/lib/middleware/api-middleware';
import { withValidation } from '@/lib/middleware/api-middleware';
import { withRateLimit } from '@/lib/middleware/api-middleware';
import { withErrorHandler } from '@/lib/middleware/api-middleware';
import { successResponse, errorResponse } from '@/lib/utils/api-response';
import type { ApiHandler } from '@/lib/middleware/api-middleware';

// =====================================================
// VALIDATION SCHEMAS
// =====================================================

const registerSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(100, 'Password is too long'),
    fullName: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name is too long')
        .optional(),
});

// =====================================================
// RATE LIMITERS
// =====================================================

const rateLimiters = {
    register: {
        requests: 5,
        window: 60 * 60, // 5 requests per hour
    },
};

// =====================================================
// HANDLER
// =====================================================

const handler: ApiHandler = async (req: Request, context?: any) => {
    const { email, password, fullName } = context.validated;

    try {
        const supabase = await createClient();

        // Attempt to sign up the user
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName || '',
                },
                emailRedirectTo: `${process.env.NEXT_PUBLIC_API_URL}/auth/callback`,
            },
        });

        if (error) {
            // Handle specific Supabase errors
            if (error.message.includes('already registered')) {
                return errorResponse('User with this email already exists', 'user_exists', 400);
            }

            if (error.message.includes('password')) {
                return errorResponse('Password does not meet requirements', 'weak_password', 400);
            }

            // Generic error
            return errorResponse(error.message, 'registration_failed', 400);
        }
        console.log(data);
        // Check if user was created
        if (!data.user) {
            return errorResponse('Failed to create user account', 'registration_failed', 500);
        }

        // Success response
        return successResponse(
            {
                user: {
                    id: data.user.id,
                    email: data.user.email,
                    fullName: data.user.user_metadata?.full_name || '',
                },
                message: data.session
                    ? 'Registration successful. You are now logged in.'
                    : 'Registration successful. Please check your email to verify your account.',
                requiresEmailVerification: !data.session,
            },
            201
        );
    } catch (err) {
        console.error('Registration error:', err);
        return errorResponse('An unexpected error occurred during registration', 'internal_error', 500);
    }
};

// =====================================================
// EXPORT ROUTE
// =====================================================

export const POST = createApiRoute(handler, [
    withRateLimit(rateLimiters.register),
    withValidation(registerSchema, 'body'),
    withErrorHandler(),
]);
