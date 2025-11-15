/**
 * HTTP Client Utilities
 * Shared HTTP client for service-to-service communication
 */

import type { ApiResponse } from '@cybersec/types';
import { AppError } from './errors.js';
import { retry } from './http.js';
import { ErrorCode } from '@cybersec/types';

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
  retry?:
    | {
        maxAttempts?: number;
        initialDelay?: number;
      }
    | false;
}

export interface ServiceClientOptions {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
  retryConfig?: {
    maxAttempts?: number;
    initialDelay?: number;
  };
}

export class ServiceClient {
  private baseURL: string;
  private defaultTimeout: number;
  private defaultHeaders: Record<string, string>;
  private retryConfig: { maxAttempts: number; initialDelay: number };

  constructor(options: ServiceClientOptions) {
    this.baseURL = options.baseURL.replace(/\/$/, ''); // Remove trailing slash
    this.defaultTimeout = options.timeout || 30000;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...options.headers,
    };
    this.retryConfig = {
      maxAttempts: options.retryConfig?.maxAttempts || 3,
      initialDelay: options.retryConfig?.initialDelay || 1000,
    };
  }

  /**
   * Make an HTTP request
   */
  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const method = options.method || 'GET';
    const timeout = options.timeout || this.defaultTimeout;

    const headers = {
      ...this.defaultHeaders,
      ...options.headers,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const fetchRequest = async () => {
        const response = await fetch(url, {
          method,
          headers,
          body: options.body ? JSON.stringify(options.body) : undefined,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const error = await this.handleErrorResponse(response);
          throw error;
        }

        const data = await response.json();
        return data as ApiResponse<T>;
      };

      // Use retry if configured
      if (options.retry !== false) {
        return await retry(fetchRequest, {
          maxAttempts: options.retry?.maxAttempts || this.retryConfig.maxAttempts,
          initialDelay: options.retry?.initialDelay || this.retryConfig.initialDelay,
        });
      }

      return await fetchRequest();
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof AppError) {
        throw error;
      }

      if ((error as Error).name === 'AbortError') {
        throw new AppError(ErrorCode.TIMEOUT, `Request timeout after ${timeout}ms`, 408);
      }

      throw new AppError(
        ErrorCode.NETWORK_ERROR,
        `Network error: ${(error as Error).message}`,
        503
      );
    }
  }

  /**
   * Handle error responses
   */
  private async handleErrorResponse(response: Response): Promise<AppError> {
    let errorData: any;

    try {
      errorData = await response.json();
    } catch {
      errorData = { message: response.statusText };
    }

    const message = errorData.error?.message || errorData.message || 'Request failed';
    const code = errorData.error?.code || ErrorCode.INTERNAL_SERVER_ERROR;

    return new AppError(code, message, response.status, errorData.error?.details);
  }

  /**
   * GET request
   */
  async get<T>(
    endpoint: string,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestOptions, 'method'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, body, method: 'POST' });
  }

  /**
   * PUT request
   */
  async put<T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestOptions, 'method'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, body, method: 'PUT' });
  }

  /**
   * PATCH request
   */
  async patch<T>(
    endpoint: string,
    body?: unknown,
    options?: Omit<RequestOptions, 'method'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, body, method: 'PATCH' });
  }

  /**
   * DELETE request
   */
  async delete<T>(
    endpoint: string,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  /**
   * Set authorization header
   */
  setAuthToken(token: string): void {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Remove authorization header
   */
  clearAuthToken(): void {
    delete this.defaultHeaders['Authorization'];
  }

  /**
   * Set custom header
   */
  setHeader(key: string, value: string): void {
    this.defaultHeaders[key] = value;
  }
}

/**
 * Create a service client instance
 */
export function createServiceClient(options: ServiceClientOptions): ServiceClient {
  return new ServiceClient(options);
}
