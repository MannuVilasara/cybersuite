/**
 * Express Validation Middleware
 * Middleware for validating request data using Zod schemas
 */

import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ValidationError } from './errors.js';

export type ValidateSource = 'body' | 'query' | 'params';

/**
 * Create a validation middleware for Express
 */
export function validateRequest<T extends z.ZodType>(
    schema: T,
    source: ValidateSource = 'body'
) {
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            const data = req[source];
            const result = schema.safeParse(data);

            if (!result.success) {
                const errors = result.error.errors.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                    code: err.code,
                }));

                throw new ValidationError('Validation failed', { errors });
            }

            // Replace request data with validated data
            req[source] = result.data;
            next();
        } catch (error) {
            next(error);
        }
    };
}

/**
 * Validate request body
 */
export function validateBody<T extends z.ZodType>(schema: T) {
    return validateRequest(schema, 'body');
}

/**
 * Validate query parameters
 */
export function validateQuery<T extends z.ZodType>(schema: T) {
    return validateRequest(schema, 'query');
}

/**
 * Validate route parameters
 */
export function validateParams<T extends z.ZodType>(schema: T) {
    return validateRequest(schema, 'params');
}

/**
 * Validate multiple sources at once
 */
export function validateMultiple(validations: {
    body?: z.ZodType;
    query?: z.ZodType;
    params?: z.ZodType;
}) {
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            const errors: Array<{ source: string; field: string; message: string }> = [];

            // Validate body
            if (validations.body) {
                const bodyResult = validations.body.safeParse(req.body);
                if (!bodyResult.success) {
                    bodyResult.error.errors.forEach((err) => {
                        errors.push({
                            source: 'body',
                            field: err.path.join('.'),
                            message: err.message,
                        });
                    });
                } else {
                    req.body = bodyResult.data;
                }
            }

            // Validate query
            if (validations.query) {
                const queryResult = validations.query.safeParse(req.query);
                if (!queryResult.success) {
                    queryResult.error.errors.forEach((err) => {
                        errors.push({
                            source: 'query',
                            field: err.path.join('.'),
                            message: err.message,
                        });
                    });
                } else {
                    req.query = queryResult.data;
                }
            }

            // Validate params
            if (validations.params) {
                const paramsResult = validations.params.safeParse(req.params);
                if (!paramsResult.success) {
                    paramsResult.error.errors.forEach((err) => {
                        errors.push({
                            source: 'params',
                            field: err.path.join('.'),
                            message: err.message,
                        });
                    });
                } else {
                    req.params = paramsResult.data;
                }
            }

            if (errors.length > 0) {
                throw new ValidationError('Validation failed', { errors });
            }

            next();
        } catch (error) {
            next(error);
        }
    };
}
