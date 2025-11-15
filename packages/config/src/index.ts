/**
 * @cybersec/config
 * Shared configuration utilities
 */

export { createEnv } from './env.js';
export { getConfig, type Config } from './config.js';
export * from './constants.js';

// Export the default config instance as `config`
import { getConfig } from './config.js';
export const config = getConfig();
