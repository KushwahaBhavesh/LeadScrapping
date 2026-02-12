import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * Middleware type definition
 */
export type ApiHandler = (req: Request, context?: any) => Promise<NextResponse>;
export type Middleware = (handler: ApiHandler) => ApiHandler;

/**
 * Compose multiple middleware functions
 */
export function compose(...middlewares: Middleware[]): Middleware {
  return (handler: ApiHandler) => {
    return middlewares.reduceRight((acc, middleware) => middleware(acc), handler);
  };
}

/**
 * Authentication middleware
 */
export function withAuth(): Middleware {
  return (handler: ApiHandler) => async (req: Request, context?: any) => {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'unauthorized',
            message: 'Unauthorized',
          },
        },
        { status: 401 }
      );
    }

    // Attach user and supabase to context
    return handler(req, { ...context, user, supabase });
  };
}

/**
 * Rate limiting middleware
 */
export function withRateLimit(limiter: any): Middleware {
  return (handler: ApiHandler) => async (req: Request, context?: any) => {
    const userId = context?.user?.id;

    if (!userId) {
      return handler(req, context);
    }

    const rateLimitResult = limiter.check(userId);

    if (!rateLimitResult.allowed) {
      const retryAfter = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000);
      const response = NextResponse.json(
        {
          success: false,
          error: {
            code: 'rate_limit_exceeded',
            message: 'Too many requests. Please try again later.',
          },
        },
        { status: 429 }
      );
      response.headers.set('Retry-After', retryAfter.toString());
      return response;
    }

    return handler(req, context);
  };
}

/**
 * Error handling middleware
 */
export function withErrorHandler(): Middleware {
  return (handler: ApiHandler) => async (req: Request, context?: any) => {
    try {
      return await handler(req, context);
    } catch (error: any) {
      console.error('API Error:', error);

      const message =
        process.env.NODE_ENV === 'development' ? error.message : 'Internal server error';

      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'internal_error',
            message,
          },
        },
        { status: 500 }
      );
    }
  };
}

/**
 * Validation middleware factory
 */
export function withValidation(schema: any, source: 'body' | 'query' = 'body'): Middleware {
  return (handler: ApiHandler) => async (req: Request, context?: any) => {
    try {
      let data: any;

      if (source === 'body') {
        data = await req.json();
      } else {
        const { searchParams } = new URL(req.url);
        data = Object.fromEntries(searchParams.entries());
      }

      const validated = schema.parse(data);

      return handler(req, { ...context, validated });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'validation_error',
              message: 'Invalid request data',
              details: error.issues,
            },
          },
          { status: 400 }
        );
      }
      throw error;
    }
  };
}

/**
 * CORS middleware
 */
export function withCors(options?: {
  origin?: string;
  methods?: string[];
  headers?: string[];
}): Middleware {
  return (handler: ApiHandler) => async (req: Request, context?: any) => {
    const response = await handler(req, context);

    response.headers.set('Access-Control-Allow-Origin', options?.origin || '*');
    response.headers.set(
      'Access-Control-Allow-Methods',
      options?.methods?.join(', ') || 'GET, POST, PUT, DELETE, OPTIONS'
    );
    response.headers.set(
      'Access-Control-Allow-Headers',
      options?.headers?.join(', ') || 'Content-Type, Authorization'
    );

    return response;
  };
}

/**
 * Logging middleware
 */
export function withLogging(): Middleware {
  return (handler: ApiHandler) => async (req: Request, context?: any) => {
    const start = Date.now();
    const { method, url } = req;

    console.log(`[${new Date().toISOString()}] ${method} ${url} - Started`);

    const response = await handler(req, context);

    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${method} ${url} - ${response.status} (${duration}ms)`
    );

    return response;
  };
}

/**
 * Create a standardized API route handler
 */
export function createApiRoute(handler: ApiHandler, middlewares: Middleware[] = []): ApiHandler {
  const composedMiddleware = compose(withErrorHandler(), ...middlewares);

  return composedMiddleware(handler);
}
