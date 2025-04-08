import fs from 'fs';
import path from 'path';
import { config } from 'src/config.js';
import { formatClientError } from './error.js';

/**
 * Log levels for different types of messages
 */
export enum LogLevel {
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  DEBUG = 'DEBUG'
}

/**
 * Logger utility for writing logs to console and files
 */
export class Logger {
  private config: LogConfig;
  /**
   * Create a new Logger instance
   * @param config Configuration for logger (default: from config)
   */
  constructor(conf: LogConfig) {
    this.config = conf;
    this.ensureLogDirectoryExists();
  }

  /**
   * Ensure the log directory exists, create it if it doesn't
   */
  private ensureLogDirectoryExists(): void {
    try {
      if (!fs.existsSync(this.config.dir)) {
        fs.mkdirSync(this.config.dir, { recursive: true });
      }
    } catch (error) {
      console.error(`Failed to create log directory: ${this.config.dir}`, error);
      const clientError = formatClientError(error);
      throw new Error(clientError.message);
    }
  }

  /**
   * Format a log message with timestamp and level
   * @param level Log level
   * @param message Message to log
   * @returns Formatted message
   */
  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  /**
   * Write a message to the log file
   * @param formattedMessage Formatted message to write
   */
  private writeToFile(formattedMessage: string): void {
    const date = new Date().toISOString().split("T")[0];
    const logFile = path.join(this.config.dir, `${date}.log`);

    fs.appendFileSync(logFile, formattedMessage + "\n");
  }

  /**
   * Log an error message
   * @param message Error message or Error object
   * @param context Optional context information
   */
  error(message: string | Error, context?: Record<string, any>): void {
    let errorMessage: string;
    let stack: string | undefined;

    if (message instanceof Error) {
      errorMessage = message.message;
      stack = message.stack;
    } else {
      errorMessage = message;
    }

    // Add context information if provided
    if (context) {
      errorMessage += ` | Context: ${JSON.stringify(context)}`;
    }

    const formattedMessage = this.formatMessage(LogLevel.ERROR, errorMessage);
    console.error(formattedMessage);

    // Write to file with stack trace if available
    this.writeToFile(formattedMessage + (stack ? `\nStack: ${stack}` : ""));
  }

  /**
   * Log a warning message
   * @param message Warning message
   * @param context Optional context information
   */
  warn(message: string, context?: Record<string, any>): void {
    let warningMessage = message;

    // Add context information if provided
    if (context) {
      warningMessage += ` | Context: ${JSON.stringify(context)}`;
    }

    const formattedMessage = this.formatMessage(LogLevel.WARN, warningMessage);
    console.warn(formattedMessage);
    this.writeToFile(formattedMessage);
  }

  /**
   * Log an info message
   * @param message Info message
   * @param context Optional context information
   */
  info(message: string, context?: Record<string, any>): void {
    let infoMessage = message;

    // Add context information if provided
    if (context) {
      infoMessage += ` | Context: ${JSON.stringify(context)}`;
    }

    const formattedMessage = this.formatMessage(LogLevel.INFO, infoMessage);
    console.info(formattedMessage);
    this.writeToFile(formattedMessage);
  }

  /**
   * Log a debug message
   * @param message Debug message
   * @param context Optional context information
   */
  debug(message: string, context?: Record<string, any>): void {
    let debugMessage = message;

    // Add context information if provided
    if (context) {
      debugMessage += ` | Context: ${JSON.stringify(context)}`;
    }

    const formattedMessage = this.formatMessage(LogLevel.DEBUG, debugMessage);
    console.debug(formattedMessage);
    this.writeToFile(formattedMessage);
  }
}

// Export a singleton instance
export const logger = new Logger(config.log);
