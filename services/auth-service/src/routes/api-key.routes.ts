/**
 * API Key Routes
 */

import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import * as apiKeyController from '../controllers/api-key.controller.js';

const router = Router();

// All API key routes require authentication
router.use(authenticate);

router.get('/', apiKeyController.listApiKeys);
router.post('/', apiKeyController.createApiKey);
router.delete('/:id', apiKeyController.revokeApiKey);

export default router;
