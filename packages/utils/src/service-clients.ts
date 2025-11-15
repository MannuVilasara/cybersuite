/**
 * Service Client Utilities for Microservice Communication
 */

import { createServiceClient, type ServiceClient } from './api-client.js';

/**
 * Get base URL from environment or use default
 */
function getServiceURL(serviceName: string, defaultPort: number): string {
  const envKey = `${serviceName.toUpperCase()}_SERVICE_URL`;
  return process.env[envKey] || `http://localhost:${defaultPort}`;
}

/**
 * Create Auth Service Client
 */
export function createAuthServiceClient(token?: string): ServiceClient {
  const client = createServiceClient({
    baseURL: getServiceURL('auth', 3001),
    timeout: 10000,
  });

  if (token) {
    client.setAuthToken(token);
  }

  return client;
}

/**
 * Create Scanner Service Client
 */
export function createScannerServiceClient(token?: string): ServiceClient {
  const client = createServiceClient({
    baseURL: getServiceURL('scanner', 3002),
    timeout: 60000, // Longer timeout for scans
  });

  if (token) {
    client.setAuthToken(token);
  }

  return client;
}

/**
 * Create Vault Service Client
 */
export function createVaultServiceClient(token?: string): ServiceClient {
  const client = createServiceClient({
    baseURL: getServiceURL('vault', 3003),
    timeout: 10000,
  });

  if (token) {
    client.setAuthToken(token);
  }

  return client;
}

/**
 * Create AI Service Client
 */
export function createAIServiceClient(token?: string): ServiceClient {
  const client = createServiceClient({
    baseURL: getServiceURL('ai', 3004),
    timeout: 30000, // Longer timeout for AI processing
  });

  if (token) {
    client.setAuthToken(token);
  }

  return client;
}

/**
 * Create Logs Service Client
 */
export function createLogsServiceClient(token?: string): ServiceClient {
  const client = createServiceClient({
    baseURL: getServiceURL('logs', 3005),
    timeout: 10000,
  });

  if (token) {
    client.setAuthToken(token);
  }

  return client;
}
