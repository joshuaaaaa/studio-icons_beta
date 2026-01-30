/**
 * Studio Icons v2.0 - Logger Utility
 */

import { DEBUG, LOG_PREFIX, VERSION } from '../constants';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: Date;
}

class Logger {
  private history: LogEntry[] = [];
  private maxHistory = 100;

  private formatMessage(level: LogLevel, message: string): string {
    return `${LOG_PREFIX} [${level.toUpperCase()}] ${message}`;
  }

  private addToHistory(entry: LogEntry): void {
    this.history.push(entry);
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }
  }

  debug(message: string, data?: unknown): void {
    if (!DEBUG) return;

    const entry: LogEntry = {
      level: 'debug',
      message,
      data,
      timestamp: new Date()
    };
    this.addToHistory(entry);

    if (data !== undefined) {
      console.debug(this.formatMessage('debug', message), data);
    } else {
      console.debug(this.formatMessage('debug', message));
    }
  }

  info(message: string, data?: unknown): void {
    const entry: LogEntry = {
      level: 'info',
      message,
      data,
      timestamp: new Date()
    };
    this.addToHistory(entry);

    if (data !== undefined) {
      console.info(this.formatMessage('info', message), data);
    } else {
      console.info(this.formatMessage('info', message));
    }
  }

  warn(message: string, data?: unknown): void {
    const entry: LogEntry = {
      level: 'warn',
      message,
      data,
      timestamp: new Date()
    };
    this.addToHistory(entry);

    if (data !== undefined) {
      console.warn(this.formatMessage('warn', message), data);
    } else {
      console.warn(this.formatMessage('warn', message));
    }
  }

  error(message: string, error?: Error | unknown): void {
    const entry: LogEntry = {
      level: 'error',
      message,
      data: error,
      timestamp: new Date()
    };
    this.addToHistory(entry);

    if (error !== undefined) {
      console.error(this.formatMessage('error', message), error);
    } else {
      console.error(this.formatMessage('error', message));
    }
  }

  getHistory(): LogEntry[] {
    return [...this.history];
  }

  clearHistory(): void {
    this.history = [];
  }

  printBanner(): void {
    console.info(
      `%c STUDIO-ICONS %c v${VERSION} `,
      'color:#3b50cd; background:#cddc39; font-weight:900; padding: 3px; border-radius: 5px 0 0 5px;',
      'color:#fff; background:#3b50cd; padding: 3px; border-radius: 0 5px 5px 0;'
    );
  }
}

export const logger = new Logger();
