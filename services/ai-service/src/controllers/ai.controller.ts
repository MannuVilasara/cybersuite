import { Request, Response, NextFunction } from 'express';
import { asyncHandler, successResponse, logger } from '@cybersec/utils';
import type { AIExplanation, AIFixSuggestion, AutoPR } from '@cybersec/types';
import { explainVulnerabilityWithAI, generateCodeFix, createPullRequest } from '../services/ai.service.js';

/**
 * POST /api/ai/explain
 * Explain a vulnerability using AI
 */
export const explainVulnerability = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { vulnerabilityId, context } = req.body;

        logger.info('Explaining vulnerability', { vulnerabilityId });

        const explanation: AIExplanation = await explainVulnerabilityWithAI(vulnerabilityId, context);

        const response = successResponse(explanation, 200);
        res.status(response.statusCode).json(response.data);
    }
);

/**
 * POST /api/ai/fix
 * Generate a code fix for a vulnerability
 */
export const generateFix = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { vulnerabilityId, includeTests } = req.body;

        logger.info('Generating fix for vulnerability', { vulnerabilityId, includeTests });

        const fixSuggestion: AIFixSuggestion = await generateCodeFix(vulnerabilityId, includeTests);

        const response = successResponse(fixSuggestion, 200);
        res.status(response.statusCode).json(response.data);
    }
);

/**
 * POST /api/ai/generate-pr
 * Create a pull request with fixes
 */
export const generatePR = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { vulnerabilityIds, title, description } = req.body;

        logger.info('Generating pull request', {
            vulnerabilityIds,
            vulnerabilityCount: vulnerabilityIds.length
        });

        const pr: AutoPR = await createPullRequest(vulnerabilityIds, title, description);

        const response = successResponse(pr, 201);
        res.status(response.statusCode).json(response.data);
    }
);
