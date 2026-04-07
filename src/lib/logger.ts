// src/lib/logger.ts

type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: any;
  timestamp: string;
  userId?: string;
}

class Logger {
  private static instance: Logger;
  private isDevelopment = process.env.NODE_ENV === 'development';

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private async persist(entry: LogEntry) {
    if (this.isDevelopment) {
      const color = {
        info: '\x1b[32m',
        warn: '\x1b[33m',
        error: '\x1b[31m'
      }[entry.level];
      console.log(`${color}[${entry.level.toUpperCase()}] ${entry.timestamp}: ${entry.message}\x1b[0m`, entry.context || '');
    }

    // Push telemetry to Sentry in Production
    if (!this.isDevelopment) {
      if (entry.level === 'error') {
        const _Sentry = require('@sentry/nextjs');
        _Sentry.captureException(new Error(entry.message), {
          extra: entry.context,
          tags: { logger: 'custom' }
        });
      } else if (entry.level === 'warn') {
        const _Sentry = require('@sentry/nextjs');
        _Sentry.captureMessage(entry.message, {
          level: 'warning',
          extra: entry.context
        });
      }
    }
  }

  public info(message: string, context?: any) {
    this.persist({ level: 'info', message, context, timestamp: new Date().toISOString() });
  }

  public warn(message: string, context?: any) {
    this.persist({ level: 'warn', message, context, timestamp: new Date().toISOString() });
  }

  public error(message: string, context?: any) {
    this.persist({ level: 'error', message, context, timestamp: new Date().toISOString() });
  }

  public trackFailure(type: string, error: any, context?: any) {
    this.error(`Failure: ${type}`, { error: error?.message || error, ...context });
  }
}

export const logger = Logger.getInstance();
