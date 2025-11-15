import { Router } from 'express';
import { validateBody } from '@cybersec/utils';
import { aiExplainSchema, aiFixSchema, aiGeneratePRSchema } from '@cybersec/utils';
import * as aiController from '../controllers/ai.controller.js';

const router = Router();

/**
 * POST /api/ai/explain
 * Explain a vulnerability using AI
 */
router.post('/explain', validateBody(aiExplainSchema), aiController.explainVulnerability);

/**
 * POST /api/ai/fix
 * Generate a code fix for a vulnerability
 */
router.post('/fix', validateBody(aiFixSchema), aiController.generateFix);

/**
 * POST /api/ai/generate-pr
 * Create a pull request with fixes
 */
router.post('/generate-pr', validateBody(aiGeneratePRSchema), aiController.generatePR);

export default router;
