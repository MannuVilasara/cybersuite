/**
 * Security Scanner Types
 */

export enum ScanStatus {
  PENDING = 'pending',
  QUEUED = 'queued',
  SCANNING = 'scanning',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum SeverityLevel {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  INFO = 'info',
}

export enum VulnerabilityType {
  SECRET_LEAK = 'secret_leak',
  SQL_INJECTION = 'sql_injection',
  XSS = 'xss',
  INSECURE_DESERIALIZATION = 'insecure_deserialization',
  HARDCODED_CREDENTIALS = 'hardcoded_credentials',
  UNSAFE_DEPENDENCIES = 'unsafe_dependencies',
  MISCONFIGURATION = 'misconfiguration',
  CODE_QUALITY = 'code_quality',
}

export interface Repository {
  id: string;
  organizationId: string;
  name: string;
  url: string;
  provider: 'github' | 'gitlab' | 'bitbucket';
  branch: string;
  isPrivate: boolean;
  lastScannedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Scan {
  id: string;
  repositoryId: string;
  userId: string;
  status: ScanStatus;
  commitHash: string | null;
  branch: string;
  startedAt: Date | null;
  completedAt: Date | null;
  duration: number | null; // milliseconds
  totalIssues: number;
  criticalIssues: number;
  highIssues: number;
  mediumIssues: number;
  lowIssues: number;
  errorMessage: string | null;
  metadata: ScanMetadata;
  createdAt: Date;
}

export interface ScanMetadata {
  filesScanned: number;
  linesOfCode: number;
  scannerVersions: {
    secretScanner: string;
    vulnEngine: string;
    dependencyScanner: string;
  };
  languages: string[];
  frameworks: string[];
}

export interface Vulnerability {
  id: string;
  scanId: string;
  type: VulnerabilityType;
  severity: SeverityLevel;
  title: string;
  description: string;
  filePath: string;
  lineNumber: number;
  lineEnd: number | null;
  code: string;
  cwe: string | null; // Common Weakness Enumeration
  cve: string | null; // Common Vulnerabilities and Exposures
  recommendation: string;
  references: string[];
  status: 'open' | 'fixed' | 'ignored' | 'false_positive';
  fixedAt: Date | null;
  aiExplanation: string | null;
  aiSuggestedFix: string | null;
  createdAt: Date;
}

export interface SecretLeak {
  id: string;
  scanId: string;
  type: string; // e.g., 'aws_key', 'github_token', 'api_key'
  filePath: string;
  lineNumber: number;
  secret: string; // Partially masked
  entropy: number;
  verified: boolean; // Whether the secret is still active
  createdAt: Date;
}

export interface DependencyVulnerability {
  id: string;
  scanId: string;
  packageName: string;
  version: string;
  severity: SeverityLevel;
  cve: string;
  cwe: string | null;
  description: string;
  fixedVersion: string | null;
  patchedVersions: string[];
  references: string[];
  createdAt: Date;
}
