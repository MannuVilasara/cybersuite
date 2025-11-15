/**
 * API Key Controllers
 */

import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '../middleware/auth.middleware.js';
import { asyncHandler, successResponse } from '@cybersec/utils';

export const listApiKeys = asyncHandler(async (req: AuthRequest, res: Response, _next: NextFunction) => {
    // TODO: Fetch user's API keys from database
    const { data, statusCode } = successResponse({
        message: 'List API keys endpoint - to be implemented',
        userId: req.user?.id,
        apiKeys: [],
    });

    res.status(statusCode).json(data);
});

export const createApiKey = asyncHandler(async (req: AuthRequest, res: Response, _next: NextFunction) => {
    // TODO: Implement API key creation logic
    const { data, statusCode } = successResponse({
        message: 'Create API key endpoint - to be implemented',
        userId: req.user?.id,
        body: req.body,
    }, 201);

    res.status(statusCode).json(data);
});

export const revokeApiKey = asyncHandler(async (req: AuthRequest, res: Response, _next: NextFunction) => {
    // TODO: Implement API key revocation logic
    const { data, statusCode } = successResponse({
        message: 'Revoke API key endpoint - to be implemented',
        userId: req.user?.id,
        apiKeyId: req.params.id,
    });

    res.status(statusCode).json(data);
});
