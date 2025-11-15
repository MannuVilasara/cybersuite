import { Request, Response, NextFunction } from 'express';
import { AppError, formatErrorResponse, logger } from '@cybersec/utils';

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction): void {
  logger.error('Error occurred', {
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
  });

  const errorResponse = formatErrorResponse(error);

  // Extract status code from error response
  const statusCode = (error as any).statusCode || 500;
  res.status(statusCode).json(errorResponse);
}
