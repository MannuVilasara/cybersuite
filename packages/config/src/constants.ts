/**
 * Application constants
 */

export const SUBSCRIPTION_LIMITS = {
  FREE: {
    scansPerMonth: 10,
    concurrentScans: 1,
    secretsVaultLimit: 25,
    logRetentionDays: 7,
    teamMembers: 1,
    aiRequestsPerMonth: 50,
  },
  BASIC: {
    scansPerMonth: 100,
    concurrentScans: 3,
    secretsVaultLimit: 100,
    logRetentionDays: 30,
    teamMembers: 5,
    aiRequestsPerMonth: 500,
  },
  PRO: {
    scansPerMonth: -1, // unlimited
    concurrentScans: 10,
    secretsVaultLimit: -1, // unlimited
    logRetentionDays: 90,
    teamMembers: 25,
    aiRequestsPerMonth: -1, // unlimited
  },
  ENTERPRISE: {
    scansPerMonth: -1, // unlimited
    concurrentScans: -1, // unlimited
    secretsVaultLimit: -1, // unlimited
    logRetentionDays: 365,
    teamMembers: -1, // unlimited
    aiRequestsPerMonth: -1, // unlimited
  },
} as const;

export const VULNERABILITY_SEVERITY_SCORES = {
  CRITICAL: 9.0,
  HIGH: 7.0,
  MEDIUM: 4.0,
  LOW: 0.1,
  INFO: 0.0,
} as const;

export const SCANNER_PATTERNS = {
  AWS_ACCESS_KEY: /AKIA[0-9A-Z]{16}/,
  AWS_SECRET_KEY: /[0-9a-zA-Z/+=]{40}/,
  GITHUB_TOKEN: /gh[pousr]_[A-Za-z0-9_]{36,}/,
  SLACK_TOKEN: /xox[baprs]-[0-9]{10,13}-[0-9]{10,13}-[a-zA-Z0-9]{24,}/,
  STRIPE_KEY: /sk_live_[0-9a-zA-Z]{24,}/,
  GENERIC_API_KEY: /[a-zA-Z0-9_-]{32,}/,
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export const CACHE_TTL = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  DAY: 86400, // 24 hours
} as const;

export const QUEUE_NAMES = {
  SCANS: 'scans',
  AI_ANALYSIS: 'ai-analysis',
  NOTIFICATIONS: 'notifications',
  REPORTS: 'reports',
  LOGS: 'logs',
} as const;

export const PERMISSIONS = {
  // User permissions
  USER_READ: 'user:read',
  USER_WRITE: 'user:write',
  USER_DELETE: 'user:delete',

  // Organization permissions
  ORG_READ: 'org:read',
  ORG_WRITE: 'org:write',
  ORG_DELETE: 'org:delete',
  ORG_ADMIN: 'org:admin',

  // Scan permissions
  SCAN_CREATE: 'scan:create',
  SCAN_READ: 'scan:read',
  SCAN_DELETE: 'scan:delete',

  // Vault permissions
  VAULT_READ: 'vault:read',
  VAULT_WRITE: 'vault:write',
  VAULT_DELETE: 'vault:delete',
  VAULT_SHARE: 'vault:share',

  // Log permissions
  LOG_READ: 'log:read',
  LOG_WRITE: 'log:write',

  // AI permissions
  AI_USE: 'ai:use',
  AI_ADMIN: 'ai:admin',
} as const;

export const FILE_SIZE_LIMITS = {
  AVATAR: 5 * 1024 * 1024, // 5MB
  LOGO: 2 * 1024 * 1024, // 2MB
  REPORT: 50 * 1024 * 1024, // 50MB
  SCAN_ARTIFACT: 100 * 1024 * 1024, // 100MB
} as const;

export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  SEMVER:
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/,
} as const;

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 20,
  maxLimit: 100,
} as const;
