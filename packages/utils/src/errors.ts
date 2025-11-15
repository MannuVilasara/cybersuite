/**
 * Custom Error Classes and Error Handling Utilities
 */

import { ErrorCode } from '@cybersec/types';

export class AppError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public statusCode: number = 500,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      details: this.details,
      stack: process.env.NODE_ENV === 'development' ? this.stack : undefined,
    };
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(ErrorCode.VALIDATION_ERROR, message, 422, details);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(ErrorCode.UNAUTHORIZED, message, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(ErrorCode.FORBIDDEN, message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    const message = id ? `${resource} with id ${id} not found` : `${resource} not found`;
    super(ErrorCode.NOT_FOUND, message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(ErrorCode.CONFLICT, message, 409);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded') {
    super(ErrorCode.RATE_LIMIT_EXCEEDED, message, 429);
  }
}

export class QuotaExceededError extends AppError {
  constructor(message: string) {
    super(ErrorCode.QUOTA_EXCEEDED, message, 429);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(ErrorCode.DATABASE_ERROR, message, 500, details);
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message: string = 'Service temporarily unavailable') {
    super(ErrorCode.SERVICE_UNAVAILABLE, message, 503);
  }
}

export class InvalidTokenError extends AppError {
  constructor(message: string = 'Invalid or expired token') {
    super(ErrorCode.INVALID_TOKEN, message, 401);
  }
}

export class SubscriptionRequiredError extends AppError {
  constructor(feature: string) {
    super(
      ErrorCode.SUBSCRIPTION_REQUIRED,
      `This feature requires an active subscription: ${feature}`,
      402
    );
  }
}

/**
 * Error handler wrapper for async functions
 */
export function asyncHandler<T extends (...args: any[]) => Promise<any>>(fn: T) {
  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return Promise.resolve(fn(...args)).catch((error) => {
      throw error instanceof AppError
        ? error
        : new AppError(
            ErrorCode.INTERNAL_SERVER_ERROR,
            error.message || 'An unexpected error occurred',
            500
          );
    });
  };
}

/**
 * Error response formatter
 */
export function formatErrorResponse(error: unknown) {
  if (error instanceof AppError) {
    return {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      timestamp: new Date().toISOString(),
    };
  }

  // Unknown error
  return {
    success: false,
    error: {
      code: ErrorCode.INTERNAL_SERVER_ERROR,
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
      stack:
        process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined,
    },
    timestamp: new Date().toISOString(),
  };
}

/**
 * Check if error is operational (known error) vs programming error
 */
export function isOperationalError(error: unknown): boolean {
  return error instanceof AppError;
}
