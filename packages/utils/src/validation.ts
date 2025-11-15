/**
 * Validation Utilities
 */

import { REGEX } from '@cybersec/config';
import { ValidationError } from './errors.js';

export function validateEmail(email: string): boolean {
  return REGEX.EMAIL.test(email);
}

export function validateUUID(uuid: string): boolean {
  return REGEX.UUID.test(uuid);
}

export function validateSlug(slug: string): boolean {
  return REGEX.SLUG.test(slug);
}

export function assertEmail(email: string, field: string = 'email'): void {
  if (!validateEmail(email)) {
    throw new ValidationError(`Invalid ${field} format`, { [field]: email });
  }
}

export function assertUUID(uuid: string, field: string = 'id'): void {
  if (!validateUUID(uuid)) {
    throw new ValidationError(`Invalid ${field} format`, { [field]: uuid });
  }
}

export function assertSlug(slug: string, field: string = 'slug'): void {
  if (!validateSlug(slug)) {
    throw new ValidationError(
      `Invalid ${field} format. Use lowercase letters, numbers, and hyphens only`,
      { [field]: slug }
    );
  }
}

export function assertRequired<T>(value: T | null | undefined, field: string): asserts value is T {
  if (value === null || value === undefined || value === '') {
    throw new ValidationError(`${field} is required`);
  }
}

export function assertMinLength(value: string, minLength: number, field: string): void {
  if (value.length < minLength) {
    throw new ValidationError(`${field} must be at least ${minLength} characters`, {
      [field]: value,
      minLength,
      actualLength: value.length,
    });
  }
}

export function assertMaxLength(value: string, maxLength: number, field: string): void {
  if (value.length > maxLength) {
    throw new ValidationError(`${field} must be at most ${maxLength} characters`, {
      [field]: value,
      maxLength,
      actualLength: value.length,
    });
  }
}

export function assertRange(value: number, min: number, max: number, field: string): void {
  if (value < min || value > max) {
    throw new ValidationError(`${field} must be between ${min} and ${max}`, {
      [field]: value,
      min,
      max,
    });
  }
}

export function sanitizeString(input: string): string {
  return input.trim().replace(/\s+/g, ' ');
}

export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - suffix.length) + suffix;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function assertUrl(url: string, field: string = 'url'): void {
  if (!isValidUrl(url)) {
    throw new ValidationError(`Invalid ${field} format`, { [field]: url });
  }
}
