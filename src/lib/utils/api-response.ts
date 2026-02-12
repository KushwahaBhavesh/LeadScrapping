import { NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * Standardized API response format
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  pagination?: {
    total: number;
    limit: number;
    offset: number;
    has_more: boolean;
  };
}

/**
 * Create a success response
 */
export function successResponse<T>(data: T, status = 200): NextResponse {
  return NextResponse.json(
    {
      success: true,
      data,
    } as ApiResponse<T>,
    { status }
  );
}

/**
 * Create a paginated success response
 */
export function paginatedResponse<T>(
  data: T[],
  pagination: {
    total: number;
    limit: number;
    offset: number;
  },
  status = 200
): NextResponse {
  return NextResponse.json(
    {
      success: true,
      data,
      pagination: {
        ...pagination,
        has_more: pagination.offset + pagination.limit < pagination.total,
      },
    } as ApiResponse<T[]>,
    { status }
  );
}

/**
 * Create an error response
 */
export function errorResponse(
  code: string,
  message: string,
  status = 500,
  details?: any
): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        details,
      },
    } as ApiResponse,
    { status }
  );
}

/**
 * Handle validation errors
 */
export function validationErrorResponse(error: z.ZodError): NextResponse {
  return errorResponse('validation_error', 'Invalid request data', 400, error.issues);
}

/**
 * Handle authentication errors
 */
export function unauthorizedResponse(message = 'Unauthorized'): NextResponse {
  return errorResponse('unauthorized', message, 401);
}

/**
 * Handle not found errors
 */
export function notFoundResponse(resource = 'Resource'): NextResponse {
  return errorResponse('not_found', `${resource} not found`, 404);
}

/**
 * Handle rate limit errors
 */
export function rateLimitResponse(retryAfter?: number): NextResponse {
  const response = errorResponse(
    'rate_limit_exceeded',
    'Too many requests. Please try again later.',
    429
  );

  if (retryAfter) {
    response.headers.set('Retry-After', retryAfter.toString());
  }

  return response;
}

/**
 * Handle internal server errors
 */
export function internalErrorResponse(error: Error): NextResponse {
  // Log error for debugging (in production, use proper logging service)
  console.error('Internal server error:', error);

  // Don't expose internal error details to client in production
  const message = process.env.NODE_ENV === 'development' ? error.message : 'Internal server error';

  return errorResponse('internal_error', message, 500);
}
