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

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// =====================================================
// RATE LIMITERS
// =====================================================

const rateLimiters = {
  login: {
    requests: 10,
    window: 60 * 15, // 10 requests per 15 minutes
  },
};

// =====================================================
// HANDLER
// =====================================================

const handler: ApiHandler = async (req: Request, context?: any) => {
  const { email, password } = context.validated;

  try {
    const supabase = await createClient();

    // Attempt to sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Handle specific authentication errors
      if (error.message.includes('Invalid login credentials')) {
        return errorResponse('Invalid email or password', 'invalid_credentials', 401);
      }

      if (error.message.includes('Email not confirmed')) {
        // Automatically resend verification email for convenience
        await supabase.auth.resend({
          type: 'signup',
          email,
          options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_API_URL}/auth/callback`,
          },
        });

        return errorResponse(
          'Email not verified. A new verification link has been sent to your email.',
          'email_not_confirmed',
          403
        );
      }

      // Generic error
      return errorResponse(error.message, 'authentication_failed', 401);
    }

    // Check if session was created
    if (!data.session || !data.user) {
      return errorResponse('Failed to create session', 'authentication_failed', 401);
    }

    // Success response
    return successResponse(
      {
        user: {
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.user_metadata?.full_name || '',
          avatarUrl: data.user.user_metadata?.avatar_url || null,
        },
        session: {
          accessToken: data.session.access_token,
          refreshToken: data.session.refresh_token,
          expiresAt: data.session.expires_at,
          expiresIn: data.session.expires_in,
        },
        message: 'Login successful',
      },
      200
    );
  } catch (err) {
    console.error('Login error:', err);
    return errorResponse('An unexpected error occurred during login', 'internal_error', 500);
  }
};

// =====================================================
// EXPORT ROUTE
// =====================================================

export const POST = createApiRoute(handler, [
  withRateLimit(rateLimiters.login),
  withValidation(loginSchema, 'body'),
  withErrorHandler(),
]);
