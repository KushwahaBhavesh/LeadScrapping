import { createClient } from '@/lib/supabase/server';
import { createApiRoute } from '@/lib/middleware/api-middleware';
import { withErrorHandler } from '@/lib/middleware/api-middleware';
import { successResponse, errorResponse } from '@/lib/utils/api-response';
import type { ApiHandler } from '@/lib/middleware/api-middleware';

// =====================================================
// HANDLER
// =====================================================

const handler: ApiHandler = async (_req: Request) => {
  try {
    const supabase = await createClient();

    // Get the redirect URL for Google OAuth
    // Supabase will handle the redirect, but we want to return the URL
    // so the client can decide when to redirect.
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_API_URL}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      console.error('Google Auth Error:', error);
      return errorResponse(error.message, 'google_auth_failed', 400);
    }

    if (!data.url) {
      return errorResponse('Failed to generate Google Auth URL', 'google_auth_failed', 500);
    }

    return successResponse(
      {
        url: data.url,
      },
      200
    );
  } catch (err) {
    console.error('Google Login Error:', err);
    return errorResponse('An unexpected error occurred during Google login', 'internal_error', 500);
  }
};

// =====================================================
// EXPORT ROUTE
// =====================================================

export const POST = createApiRoute(handler, [withErrorHandler()]);
