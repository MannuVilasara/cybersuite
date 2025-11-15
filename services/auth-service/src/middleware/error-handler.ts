/**
 * Express Error Handling Middleware
 */

import type { Request, Response, NextFunction } from 'express';
import { formatErrorResponse, isOperationalError, AppError } from '@cybersec/utils';
import type { Logger } from '@cybersec/utils';
import { ErrorCode } from '@cybersec/types';

export function errorHandler(logger: Logger) {
    return (err: Error, _req: Request, res: Response, _next: NextFunction) => {
        // Log error
        logger.error('Request error', {
            error: err,
            name: err.name,
            message: err.message,
            stack: err.stack,
        });

        // Handle known operational errors
        if (isOperationalError(err)) {
            const appError = err as AppError;
            const response = formatErrorResponse(err);
            return res.status(appError.statusCode).json(response);
        }

        // Handle JWT errors
        if (err.name === 'JsonWebTokenError') {
            const response = formatErrorResponse(
                new AppError(ErrorCode.INVALID_TOKEN, 'Invalid authentication token', 401)
            );
            return res.status(401).json(response);
        }

        if (err.name === 'TokenExpiredError') {
            const response = formatErrorResponse(
                new AppError(ErrorCode.INVALID_TOKEN, 'Authentication token expired', 401)
            );
            return res.status(401).json(response);
        }

        // Handle validation errors
        if (err.name === 'ZodError') {
            const response = formatErrorResponse(
                new AppError(ErrorCode.VALIDATION_ERROR, 'Validation failed', 422)
            );
            return res.status(422).json(response);
        }

        // Unknown errors - don't leak details in production
        const response = formatErrorResponse(
            new AppError(
                ErrorCode.INTERNAL_SERVER_ERROR,
                process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
                500
            )
        );
        return res.status(500).json(response);
    };
}
