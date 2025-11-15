/**
 * Request Logging Middleware
 */

import type { Request, Response, NextFunction } from 'express';
import type { Logger } from '@cybersec/utils';

export function requestLogger(logger: Logger) {
    return (req: Request, res: Response, next: NextFunction) => {
        const start = Date.now();

        // Log request
        logger.debug('Incoming request', {
            method: req.method,
            path: req.path,
            query: req.query,
            ip: req.ip,
            userAgent: req.get('user-agent'),
        });

        // Log response
        res.on('finish', () => {
            const duration = Date.now() - start;
            const level = res.statusCode >= 400 ? 'warn' : 'info';

            logger[level]('Request completed', {
                method: req.method,
                path: req.path,
                statusCode: res.statusCode,
                duration,
                ip: req.ip,
            });
        });

        next();
    };
}
