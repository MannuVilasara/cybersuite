/**
 * Zod Validation Schemas
 * Common validation schemas for API requests and data
 */

import { z } from 'zod';

/**
 * Common field validations
 */
export const emailSchema = z.string().email('Invalid email address');
export const uuidSchema = z.string().uuid('Invalid UUID format');
export const urlSchema = z.string().url('Invalid URL format');
export const slugSchema = z
  .string()
  .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens');

/**
 * Pagination schema
 */
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type PaginationInput = z.infer<typeof paginationSchema>;

/**
 * User validation schemas
 */
export const userRegistrationSchema = z.object({
  email: emailSchema,
  password: z.string().min(8, 'Password must be at least 8 characters').max(100),
  name: z.string().min(2).max(100),
  organizationName: z.string().min(2).max(100).optional(),
});

export const userLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const userUpdateSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  avatarUrl: urlSchema.optional(),
  timezone: z.string().optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters').max(100),
});

/**
 * Organization validation schemas
 */
export const createOrganizationSchema = z.object({
  name: z.string().min(2).max(100),
  slug: slugSchema,
  website: urlSchema.optional(),
});

export const updateOrganizationSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  website: urlSchema.optional(),
});

/**
 * Repository/Scan validation schemas
 */
export const createScanSchema = z.object({
  repositoryUrl: urlSchema.refine(
    (url: string) =>
      url.includes('github.com') || url.includes('gitlab.com') || url.includes('bitbucket.org'),
    'Must be a valid GitHub, GitLab, or Bitbucket repository URL'
  ),
  branch: z.string().min(1).max(255).default('main'),
  scanDepth: z.number().int().min(1).max(100).default(100),
});

export const scanFilterSchema = paginationSchema.extend({
  status: z.enum(['pending', 'running', 'completed', 'failed']).optional(),
  severity: z.enum(['critical', 'high', 'medium', 'low', 'info']).optional(),
});

/**
 * Vault/Secret validation schemas
 */
export const createSecretSchema = z.object({
  name: z.string().min(1).max(255),
  value: z.string().min(1),
  type: z.enum(['api-key', 'password', 'token', 'certificate', 'ssh-key', 'environment-variable']),
  description: z.string().max(1000).optional(),
  expiresAt: z.string().datetime().optional(),
  tags: z.array(z.string()).optional(),
});

export const updateSecretSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  value: z.string().min(1).optional(),
  description: z.string().max(1000).optional(),
  expiresAt: z.string().datetime().nullable().optional(),
  tags: z.array(z.string()).optional(),
});

/**
 * API Key validation schemas
 */
export const createApiKeySchema = z.object({
  name: z.string().min(1).max(255),
  permissions: z.array(z.string()).min(1, 'At least one permission is required'),
  expiresAt: z.string().datetime().optional(),
});

/**
 * Log/Alert validation schemas
 */
export const createAlertSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(1000),
  severity: z.enum(['critical', 'high', 'medium', 'low', 'info']),
  source: z.string().min(1).max(100),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const alertFilterSchema = paginationSchema.extend({
  severity: z.enum(['critical', 'high', 'medium', 'low', 'info']).optional(),
  status: z.enum(['open', 'acknowledged', 'resolved', 'ignored']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

/**
 * AI validation schemas
 */
export const aiExplainSchema = z.object({
  vulnerabilityId: uuidSchema,
  context: z.string().max(5000).optional(),
});

export const aiFixSchema = z.object({
  vulnerabilityId: uuidSchema,
  includeTests: z.boolean().default(false),
});

export const aiGeneratePRSchema = z.object({
  vulnerabilityIds: z.array(uuidSchema).min(1, 'At least one vulnerability is required').max(10),
  title: z.string().min(1).max(255).optional(),
  description: z.string().max(2000).optional(),
});

/**
 * Webhook validation schemas
 */
export const createWebhookSchema = z.object({
  url: urlSchema,
  events: z.array(z.string()).min(1, 'At least one event is required'),
  secret: z.string().min(16).max(255).optional(),
  active: z.boolean().default(true),
});

export const updateWebhookSchema = z.object({
  url: urlSchema.optional(),
  events: z.array(z.string()).min(1).optional(),
  secret: z.string().min(16).max(255).optional(),
  active: z.boolean().optional(),
});

/**
 * Generic ID parameter validation
 */
export const idParamSchema = z.object({
  id: uuidSchema,
});

export const slugParamSchema = z.object({
  slug: slugSchema,
});

/**
 * Validate data against a Zod schema
 */
export function validate<T extends z.ZodType>(schema: T, data: unknown): z.infer<T> {
  return schema.parse(data);
}

/**
 * Safely validate data and return errors
 */
export function validateSafe<T extends z.ZodType>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; errors: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}
