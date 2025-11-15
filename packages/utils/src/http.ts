/**
 * HTTP Utilities
 */

import { ApiResponse } from '@cybersec/types';

/**
 * Create a success response
 */
export function successResponse<T>(
  data: T,
  statusCode: number = 200
): { data: ApiResponse<T>; statusCode: number } {
  return {
    data: {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    },
    statusCode,
  };
}

/**
 * Parse pagination parameters
 */
export function parsePaginationParams(query: {
  page?: string | number;
  limit?: string | number;
  sortBy?: string;
  sortOrder?: string;
}) {
  const page = Math.max(1, parseInt(String(query.page || 1), 10));
  const limit = Math.min(100, Math.max(1, parseInt(String(query.limit || 20), 10)));
  const sortBy = query.sortBy || 'createdAt';
  const sortOrder =
    query.sortOrder === 'asc' || query.sortOrder === 'desc' ? query.sortOrder : 'desc';

  return {
    page,
    limit,
    sortBy,
    sortOrder,
    skip: (page - 1) * limit,
  };
}

/**
 * Calculate pagination metadata
 */
export function calculatePagination(total: number, page: number, limit: number) {
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

/**
 * Extract IP address from request headers
 */
export function extractIP(headers: Record<string, string | string[] | undefined>): string {
  const forwarded = headers['x-forwarded-for'];
  if (forwarded) {
    const ip = Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0];
    return ip?.trim() || 'unknown';
  }

  const realIP = headers['x-real-ip'];
  if (realIP) {
    const ip = Array.isArray(realIP) ? realIP[0] : realIP;
    return ip || 'unknown';
  }

  return 'unknown';
} /**
 * Parse user agent
 */
export function parseUserAgent(userAgent: string | undefined): string {
  return userAgent || 'unknown';
}

/**
 * Build query string from object
 */
export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, String(v)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : '';
}

/**
 * Sleep utility for delays
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number;
    initialDelay?: number;
    maxDelay?: number;
    backoffFactor?: number;
  } = {}
): Promise<T> {
  const { maxAttempts = 3, initialDelay = 1000, maxDelay = 10000, backoffFactor = 2 } = options;

  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxAttempts) {
        throw lastError;
      }

      const delay = Math.min(initialDelay * Math.pow(backoffFactor, attempt - 1), maxDelay);
      await sleep(delay);
    }
  }

  throw lastError!;
}
