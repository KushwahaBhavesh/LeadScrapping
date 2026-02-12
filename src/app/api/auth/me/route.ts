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
    const user = context?.user;
    const supabase = context?.supabase || (await createClient());

    if (!user) {
      return errorResponse('User not found', 'unauthorized', 401);
    }

    // Fetch user profile from database
    const { data: profile } = await supabase.from('users').select('*').eq('id', user.id).single();

    // Fetch user credits
    const { data: credits } = await supabase
      .from('credits')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // Return user data
    return successResponse(
      {
        user: {
          id: user.id,
          email: user.email,
          fullName: profile?.full_name || user.user_metadata?.full_name || '',
          avatarUrl: profile?.avatar_url || user.user_metadata?.avatar_url || null,
          preferences: profile?.preferences || {},
          createdAt: profile?.created_at || user.created_at,
        },
        credits: {
          balance: credits?.balance || 0,
          totalPurchased: credits?.total_purchased || 0,
          totalUsed: credits?.total_used || 0,
        },
      },
      200
    );
  } catch (err) {
    console.error('Get user profile error:', err);
    return errorResponse(
      'An unexpected error occurred while fetching user profile',
      'internal_error',
      500
    );
  }
};

// =====================================================
// EXPORT ROUTE
// =====================================================

export const GET = createApiRoute(handler, [
  withAuth(), // Requires authentication
  withErrorHandler(),
]);
