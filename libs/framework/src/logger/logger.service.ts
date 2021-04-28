import { INestApplication, Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as colors from 'colors';

@Injectable()
export class LogService implements LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    const printf = winston.format.printf(
      ({ level, message, label, timestamp, meta }) =>
        `${colors.blue(`[${label ?? 'Nest'}]`)} ${timestamp} ${
          level === 'error' ? colors.red(`${level} ${message}`) : colors.green(`${level} ${message}`)
        } ${meta ? `${colors.magenta(`${meta.responseTime}ms` ?? '')} request: ${JSON.stringify(meta)}` : ''}`,
    );
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.timestamp(),
        process.env.NODE_ENV === 'production'
          ? winston.format.combine(winston.format.uncolorize(), printf, winston.format.json())
          : printf,
      ),
      transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
          dirname: './logs',
          filename: 'application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxFiles: '14d',
          format: winston.format.uncolorize(),
        }),
      ],
    });
  }

  get winstonLogger() {
    return this.logger;
  }

  static configure(app: INestApplication) {
    const logService = new LogService();
    app.useLogger(logService);
    app.use(
      expressWinston.logger({
        requestWhitelist: [...expressWinston.requestWhitelist, 'body', 'session', 'currentContext'],
        bodyBlacklist: ['password'],
        responseWhitelist: [...expressWinston.responseWhitelist, 'body'],
        winstonInstance: logService.winstonLogger.child({
          label: 'http-rest',
        }),
      }),
    );
  }

  debug(message: any, context?: string): any {
    this.logger.debug(`${colors.yellow(`[${context ?? '@app'}]`)} - ${message}`);
  }

  error(message: any, trace?: string, context?: string): any {
    this.logger.error(`${colors.yellow(`[${context ?? '@app'}]`)} - ${message}`);
  }

  log(message: any, context?: string): any {
    this.logger.info(`${colors.yellow(`[${context ?? '@app'}]`)} - ${message}`);
  }

  verbose(message: any, context?: string): any {
    this.logger.verbose(`${colors.yellow(`[${context ?? '@app'}]`)} - ${message}`);
  }

  warn(message: any, context?: string): any {
    this.logger.warn(`${colors.yellow(`[${context ?? '@app'}]`)} - ${message}`);
  }
}
