/**
 * Secrets Vault Types
 */

export enum SecretType {
  API_KEY = 'api_key',
  PASSWORD = 'password',
  TOKEN = 'token',
  CERTIFICATE = 'certificate',
  SSH_KEY = 'ssh_key',
  DATABASE_URL = 'database_url',
  CUSTOM = 'custom',
}

export interface Vault {
  id: string;
  organizationId: string;
  name: string;
  description: string | null;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Secret {
  id: string;
  vaultId: string;
  name: string;
  type: SecretType;
  encryptedValue: string; // Client-side encrypted
  encryptedMetadata: string | null; // Additional encrypted data
  iv: string; // Initialization vector for AES
  salt: string; // Salt for key derivation
  version: number; // For secret rotation
  expiresAt: Date | null;
  tags: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  lastAccessedAt: Date | null;
  rotatedAt: Date | null;
}

export interface SecretVersion {
  id: string;
  secretId: string;
  version: number;
  encryptedValue: string;
  iv: string;
  createdBy: string;
  createdAt: Date;
}

export interface SecretAccessToken {
  id: string;
  secretId: string;
  userId: string;
  token: string;
  oneTime: boolean;
  expiresAt: Date;
  usedAt: Date | null;
  ipAddress: string | null;
  createdAt: Date;
}

export interface VaultAuditLog {
  id: string;
  vaultId: string | null;
  secretId: string | null;
  userId: string;
  action: VaultAuditAction;
  ipAddress: string | null;
  userAgent: string | null;
  metadata: Record<string, unknown>;
  timestamp: Date;
}

export enum VaultAuditAction {
  SECRET_CREATED = 'secret_created',
  SECRET_ACCESSED = 'secret_accessed',
  SECRET_UPDATED = 'secret_updated',
  SECRET_DELETED = 'secret_deleted',
  SECRET_ROTATED = 'secret_rotated',
  VAULT_CREATED = 'vault_created',
  VAULT_DELETED = 'vault_deleted',
  ACCESS_GRANTED = 'access_granted',
  ACCESS_REVOKED = 'access_revoked',
  UNAUTHORIZED_ACCESS = 'unauthorized_access',
}
