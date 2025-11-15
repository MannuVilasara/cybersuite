/**
 * Log Monitoring Types
 */

export enum LogLevel {
  TRACE = 'trace',
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal',
}

export enum AlertSeverity {
  INFO = 'info',
  WARNING = 'warning',
  CRITICAL = 'critical',
}

export enum AlertStatus {
  ACTIVE = 'active',
  ACKNOWLEDGED = 'acknowledged',
  RESOLVED = 'resolved',
  IGNORED = 'ignored',
}

export interface LogEntry {
  id: string;
  organizationId: string;
  applicationId: string;
  level: LogLevel;
  message: string;
  timestamp: Date;
  source: string; // service name
  environment: string;
  traceId: string | null;
  spanId: string | null;
  metadata: Record<string, unknown>;
  tags: string[];
  stackTrace: string | null;
  createdAt: Date;
}

export interface Application {
  id: string;
  organizationId: string;
  name: string;
  description: string | null;
  environment: string;
  retentionDays: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Alert {
  id: string;
  organizationId: string;
  applicationId: string | null;
  severity: AlertSeverity;
  status: AlertStatus;
  title: string;
  description: string;
  detectionRule: string;
  logEntryIds: string[];
  triggeredAt: Date;
  acknowledgedAt: Date | null;
  acknowledgedBy: string | null;
  resolvedAt: Date | null;
  resolvedBy: string | null;
  metadata: Record<string, unknown>;
}

export interface AlertRule {
  id: string;
  organizationId: string;
  applicationId: string | null;
  name: string;
  description: string | null;
  condition: AlertCondition;
  severity: AlertSeverity;
  enabled: boolean;
  notifications: NotificationChannel[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AlertCondition {
  type: 'threshold' | 'pattern' | 'anomaly';
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'regex';
  value: string | number;
  timeWindow: number; // minutes
  occurrences: number;
}

export interface NotificationChannel {
  type: 'email' | 'webhook' | 'slack';
  destination: string;
  enabled: boolean;
}

export interface LogPattern {
  id: string;
  organizationId: string;
  name: string;
  pattern: string; // regex or search pattern
  category: 'error' | 'attack' | 'suspicious' | 'misconfiguration';
  severity: AlertSeverity;
  description: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
