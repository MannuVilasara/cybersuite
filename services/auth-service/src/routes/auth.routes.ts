/**
 * Authentication Routes
 */

import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

// Authentication endpoints
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refreshToken);
router.post('/verify-email', authController.verifyEmail);

// Password management
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// OAuth endpoints (placeholders)
router.get('/oauth/github', authController.githubOAuth);
router.get('/oauth/github/callback', authController.githubOAuthCallback);
router.get('/oauth/google', authController.googleOAuth);
router.get('/oauth/google/callback', authController.googleOAuthCallback);

export default router;
