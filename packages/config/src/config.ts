/**
 * Application configuration
 */

export interface Config {
    app: {
        name: string;
        version: string;
        env: 'development' | 'production' | 'test';
    };
    server: {
        port: number;
        host: string;
        cors: {
            origin: string[];
            credentials: boolean;
        };
    };
    database: {
        url: string;
        poolMin: number;
        poolMax: number;
        idleTimeoutMillis: number;
    };
    redis: {
        url: string;
        keyPrefix: string;
    };
    security: {
        bcryptRounds: number;
        sessionMaxAge: number;
        rateLimit: {
            windowMs: number;
            maxRequests: number;
        };
    };
    features: {
        aiAutoFix: boolean;
        logMonitoring: boolean;
        vault: boolean;
        scanner: boolean;
    };
    logging: {
        level: 'debug' | 'info' | 'warn' | 'error';
        pretty: boolean;
    };
    corsOrigin: string;
    aiService: {
        port: number;
    };
    authService: {
        port: number;
    };
    scannerService: {
        port: number;
    };
    openai?: {
        apiKey: string;
        model: string;
        maxTokens: number;
        temperature: number;
    };
    github?: {
        token: string;
    };
}

const defaultConfig: Config = {
    app: {
        name: 'Cybersec Platform',
        version: '0.1.0',
        env: (process.env.NODE_ENV as any) || 'development',
    },
    server: {
        port: parseInt(process.env.PORT || '4000', 10),
        host: process.env.HOST || '0.0.0.0',
        cors: {
            origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
            credentials: true,
        },
    },
    database: {
        url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/cybersec_db',
        poolMin: 2,
        poolMax: 10,
        idleTimeoutMillis: 30000,
    },
    redis: {
        url: process.env.REDIS_URL || 'redis://localhost:6379',
        keyPrefix: 'cybersec:',
    },
    security: {
        bcryptRounds: 12,
        sessionMaxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        rateLimit: {
            windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
            maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
        },
    },
    features: {
        aiAutoFix: process.env.ENABLE_AI_AUTO_FIX === 'true',
        logMonitoring: process.env.ENABLE_LOG_MONITORING === 'true',
        vault: process.env.ENABLE_VAULT === 'true',
        scanner: true,
    },
    logging: {
        level: (process.env.LOG_LEVEL as any) || 'info',
        pretty: process.env.NODE_ENV === 'development',
    },
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    aiService: {
        port: parseInt(process.env.AI_SERVICE_PORT || '3004', 10),
    },
    authService: {
        port: parseInt(process.env.AUTH_SERVICE_PORT || '3001', 10),
    },
    scannerService: {
        port: parseInt(process.env.SCANNER_SERVICE_PORT || '3002', 10),
    },
    openai: process.env.OPENAI_API_KEY ? {
        apiKey: process.env.OPENAI_API_KEY,
        model: process.env.OPENAI_MODEL || 'gpt-4',
        maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '2000', 10),
        temperature: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
    } : undefined,
    github: process.env.GITHUB_TOKEN ? {
        token: process.env.GITHUB_TOKEN,
    } : undefined,
};

export function getConfig(): Config {
    return defaultConfig;
}
