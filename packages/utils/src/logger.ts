/**
 * Logging Utility
 */

import { LogLevel } from '@cybersec/types';

export interface LoggerOptions {
    service: string;
    level: LogLevel;
    pretty?: boolean;
    metadata?: Record<string, unknown>;
}

export interface LogContext {
    [key: string]: unknown;
    userId?: string;
    organizationId?: string;
    requestId?: string;
    traceId?: string;
    error?: Error;
}

export class Logger {
    private service: string;
    private level: LogLevel;
    private pretty: boolean;
    private metadata: Record<string, unknown>;

    private levels: Record<LogLevel, number> = {
        [LogLevel.TRACE]: 0,
        [LogLevel.DEBUG]: 1,
        [LogLevel.INFO]: 2,
        [LogLevel.WARN]: 3,
        [LogLevel.ERROR]: 4,
        [LogLevel.FATAL]: 5,
    };

    constructor(options: LoggerOptions) {
        this.service = options.service;
        this.level = options.level;
        this.pretty = options.pretty ?? false;
        this.metadata = options.metadata ?? {};
    }

    private shouldLog(level: LogLevel): boolean {
        return this.levels[level] >= this.levels[this.level];
    }

    private formatLog(level: LogLevel, message: string, context?: LogContext) {
        const timestamp = new Date().toISOString();
        const log = {
            timestamp,
            level,
            service: this.service,
            message,
            ...this.metadata,
            ...context,
        };

        if (context?.error) {
            log.error = {
                name: context.error.name,
                message: context.error.message,
                stack: context.error.stack,
            };
        }

        return log;
    }

    private output(level: LogLevel, message: string, context?: LogContext) {
        if (!this.shouldLog(level)) return;

        const log = this.formatLog(level, message, context);

        if (this.pretty) {
            const color = this.getColor(level);
            console.log(
                `${color}[${log.timestamp}] ${level.toUpperCase()} [${this.service}]:${'\x1b[0m'} ${message}`,
                context ? context : ''
            );
        } else {
            const output = JSON.stringify(log);
            if (level === LogLevel.ERROR || level === LogLevel.FATAL) {
                console.error(output);
            } else {
                console.log(output);
            }
        }
    }

    private getColor(level: LogLevel): string {
        const colors: Record<LogLevel, string> = {
            [LogLevel.TRACE]: '\x1b[90m', // gray
            [LogLevel.DEBUG]: '\x1b[36m', // cyan
            [LogLevel.INFO]: '\x1b[32m',  // green
            [LogLevel.WARN]: '\x1b[33m',  // yellow
            [LogLevel.ERROR]: '\x1b[31m', // red
            [LogLevel.FATAL]: '\x1b[35m', // magenta
        };
        return colors[level];
    }

    trace(message: string, context?: LogContext) {
        this.output(LogLevel.TRACE, message, context);
    }

    debug(message: string, context?: LogContext) {
        this.output(LogLevel.DEBUG, message, context);
    }

    info(message: string, context?: LogContext) {
        this.output(LogLevel.INFO, message, context);
    }

    warn(message: string, context?: LogContext) {
        this.output(LogLevel.WARN, message, context);
    }

    error(message: string, context?: LogContext) {
        this.output(LogLevel.ERROR, message, context);
    }

    fatal(message: string, context?: LogContext) {
        this.output(LogLevel.FATAL, message, context);
    }

    child(metadata: Record<string, unknown>): Logger {
        return new Logger({
            service: this.service,
            level: this.level,
            pretty: this.pretty,
            metadata: { ...this.metadata, ...metadata },
        });
    }
}

/**
 * Create a logger instance
 */
export function createLogger(options: LoggerOptions): Logger {
    return new Logger(options);
}

/**
 * Default logger instance
 */
export const logger = createLogger({
    service: 'cybersec-platform',
    level: (process.env.LOG_LEVEL as LogLevel) || LogLevel.INFO,
    pretty: process.env.NODE_ENV === 'development',
});
