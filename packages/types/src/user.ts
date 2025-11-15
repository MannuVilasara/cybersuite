/**
 * User and Authentication Types
 */

export enum UserRole {
  ADMIN = 'admin',
  ORG_OWNER = 'org-owner',
  DEVELOPER = 'developer',
  VIEWER = 'viewer',
}

export enum SubscriptionTier {
  FREE = 'free',
  BASIC = 'basic',
  PRO = 'pro',
  ENTERPRISE = 'enterprise',
}

export enum AuthProvider {
  LOCAL = 'local',
  GOOGLE = 'google',
  GITHUB = 'github',
}

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string | null;
  avatarUrl: string | null;
  role: UserRole;
  provider: AuthProvider;
  providerId: string | null;
  organizationId: string | null;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date | null;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  subscriptionTier: SubscriptionTier;
  subscriptionStatus: 'active' | 'canceled' | 'past_due' | 'trialing';
  subscriptionEndsAt: Date | null;
  settings: OrganizationSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrganizationSettings {
  scanLimits: {
    monthly: number;
    concurrent: number;
  };
  vaultLimits: {
    secrets: number;
    vaults: number;
  };
  logRetentionDays: number;
  allowedDomains: string[];
  ssoEnabled: boolean;
  twoFactorRequired: boolean;
}

export interface Team {
  id: string;
  organizationId: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  role: UserRole;
  joinedAt: Date;
}

export interface ApiKey {
  id: string;
  userId: string;
  organizationId: string;
  name: string;
  key: string; // Hashed
  keyPreview: string; // First 8 chars for display
  permissions: string[];
  expiresAt: Date | null;
  lastUsedAt: Date | null;
  createdAt: Date;
  revokedAt: Date | null;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  refreshToken: string;
  expiresAt: Date;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
}
