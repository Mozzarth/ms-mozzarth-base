import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { logs } from '@opentelemetry/api-logs';

export class OtelWinstonLogger implements LoggerService {
  private winstonLogger: winston.Logger;
  private otelLogger = logs.getLogger('nestjs');

  constructor() {
    this.winstonLogger = winston.createLogger({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize({ all: true, colors: { info: 'blue', error: 'red', warn: 'yellow', debug: 'green' } }),
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
      ),
      transports: [new winston.transports.Console()]
    });
  }

  private sendToOtel(level: string, message: string, context?: string, trace?: string) {
    this.otelLogger.emit({
      attributes: { context },
      severityText: level.toUpperCase(),
      body: `[${context ?? 'NestJS'}] ${message} ${trace ? `- ${trace}` : ''}`
    });
  }

  log(message: string, context?: string, trace?: string) {
    this.winstonLogger.info(`${message} ${trace ? `- ${trace}` : ''}`);
    this.sendToOtel('info', message, context, trace);
  }

  error(message: string, trace?: string, context?: string) {
    this.winstonLogger.error(`${message} - ${trace}`);
    this.sendToOtel('error', message, context, trace);
  }

  warn(message: string, context?: string, trace?: string) {
    this.winstonLogger.warn(`${message} ${trace ? `- ${trace}` : ''}`);
    this.sendToOtel('warn', message, context, trace);
  }

  debug(message: string, context?: string, trace?: string) {
    this.winstonLogger.debug(`${message} ${trace ? `- ${trace}` : ''}`);
    this.sendToOtel('debug', message, context, trace);
  }

  verbose(message: string, context?: string, trace?: string) {
    this.winstonLogger.verbose(`${message} ${trace ? `- ${trace}` : ''}`);
    this.sendToOtel('trace', message, context, trace);
  }
}
