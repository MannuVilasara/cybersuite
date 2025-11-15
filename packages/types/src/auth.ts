/**
 * User and Authentication Types
 */

export enum UserRole {
  ADMIN = 'admin',
  ORG_OWNER = 'org_owner',
  DEVELOPER = 'developer',
  VIEWER = 'viewer',
}

export enum SubscriptionTier {
  FREE = 'free',
  BASIC = 'basic',
  PRO = 'pro',
  ENTERPRISE = 'enterprise',
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  role: UserRole;
  organizationId: string | null;
  subscriptionTier: SubscriptionTier;
  emailVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date | null;
}

export interface UserProfile extends User {
  phoneNumber: string | null;
  timezone: string;
  language: string;
  notificationPreferences: NotificationPreferences;
  twoFactorEnabled: boolean;
}

export interface NotificationPreferences {
  email: boolean;
  webhook: boolean;
  slack: boolean;
  scanComplete: boolean;
  vulnerabilityFound: boolean;
  highSeverityAlert: boolean;
  weeklyReport: boolean;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logoUrl: string | null;
  ownerId: string;
  subscriptionTier: SubscriptionTier;
  billingEmail: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
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
  addedAt: Date;
  addedBy: string;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string; // hashed
  keyPreview: string; // last 4 characters
  userId: string;
  organizationId: string;
  permissions: string[];
  expiresAt: Date | null;
  lastUsedAt: Date | null;
  isActive: boolean;
  createdAt: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
}

export interface JWTPayload {
  sub: string; // user id
  email: string;
  role: UserRole;
  organizationId: string | null;
  tier: SubscriptionTier;
  iat: number;
  exp: number;
}

export interface OAuthProfile {
  provider: 'github' | 'google';
  providerId: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  accessToken: string;
  refreshToken?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  organizationName?: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface UpdatePasswordRequest {
  token: string;
  newPassword: string;
}

export interface VerifyEmailRequest {
  token: string;
}
