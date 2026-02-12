/**
 * Simple in-memory rate limiter
 * For production, use Redis-based rate limiting (Upstash)
 */

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export class RateLimiter {
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  /**
   * Check if request should be rate limited
   * @returns { allowed: boolean, remaining: number, resetTime: number }
   */
  check(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const entry = rateLimitStore.get(identifier);

    // Clean up expired entries periodically
    if (Math.random() < 0.01) {
      this.cleanup();
    }

    // No entry or expired entry
    if (!entry || now > entry.resetTime) {
      const resetTime = now + this.config.windowMs;
      rateLimitStore.set(identifier, {
        count: 1,
        resetTime,
      });

      return {
        allowed: true,
        remaining: this.config.maxRequests - 1,
        resetTime,
      };
    }

    // Increment count
    entry.count++;

    // Check if limit exceeded
    if (entry.count > this.config.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
      };
    }

    return {
      allowed: true,
      remaining: this.config.maxRequests - entry.count,
      resetTime: entry.resetTime,
    };
  }

  /**
   * Clean up expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }
}

/**
 * Rate limit configurations for different endpoints
 */
export const rateLimiters = {
  // 100 requests per minute for authenticated users
  authenticated: new RateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 100,
  }),

  // 10 requests per minute for unauthenticated users
  unauthenticated: new RateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 10,
  }),

  // 5 scraping jobs per minute
  scraping: new RateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 5,
  }),

  // 20 exports per hour
  export: new RateLimiter({
    windowMs: 60 * 60 * 1000,
    maxRequests: 20,
  }),
};
