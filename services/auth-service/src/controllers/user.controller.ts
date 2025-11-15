/**
 * User Controllers
 */

import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '../middleware/auth.middleware.js';
import { asyncHandler, successResponse } from '@cybersec/utils';

export const getCurrentUser = asyncHandler(async (req: AuthRequest, res: Response, _next: NextFunction) => {
    // TODO: Fetch full user details from database
    const { data, statusCode } = successResponse({
        user: req.user,
    });

    res.status(statusCode).json(data);
});

export const updateProfile = asyncHandler(async (req: AuthRequest, res: Response, _next: NextFunction) => {
    // TODO: Implement profile update logic
    const { data, statusCode } = successResponse({
        message: 'Update profile endpoint - to be implemented',
        userId: req.user?.id,
        body: req.body,
    });

    res.status(statusCode).json(data);
});

export const changePassword = asyncHandler(async (req: AuthRequest, res: Response, _next: NextFunction) => {
    // TODO: Implement password change logic
    const { data, statusCode } = successResponse({
        message: 'Change password endpoint - to be implemented',
        userId: req.user?.id,
    });

    res.status(statusCode).json(data);
});
