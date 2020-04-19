import { createLogger, format, transports, Logger } from 'winston';
import dateFormat from 'dateformat';

import { environment } from '../config/environment';

export class WinstonLogger {
  route: string;
  env: string;
  logger: Logger;
  fileName: string;
  date: string;
  message: string;

  constructor(route: string) {
    this.route = route;
    this.env = environment.nodeEnv;
    this.date = dateFormat(new Date(), 'yyyy-mm-dd');
    this.fileName = `app-` + this.date + '.log';
    this.message = '';
    this.logger = this.createLogger();
  }

  createLogger = (): Logger => {
    const logger: Logger = createLogger({
      level: this.env === 'development' ? 'debug' : 'info',
      format: format.combine(
        format.label({ label: this.route }),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf((info) => {
          let out = `[${info.timestamp}] [${info.level}] [${info.label}] [${info.message}]`;
          if (info.meta) {
            out = out + ' [' + info.meta + ']';
          }
          return out;
        })
      ),
      transports: [
        new transports.Console(),
        new transports.File({
          filename: environment.loggingPath + this.fileName,
          handleExceptions: true,
          maxsize: 5242880, // 5MB
          maxFiles: 5,
        }),
      ],
    });
    console.log(environment.loggingPath + this.fileName);
    return logger;
  };

  public info = async (message: any, meta?: any) => {
    try {
      if (meta) {
        this.logger.log('info', message, { meta });
      } else {
        this.logger.log('info', message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  public debug = async (message: any, meta?: any) => {
    try {
      if (meta) {
        this.logger.log('debug', message, { meta });
      } else {
        this.logger.log('debug', message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  public warn = async (message: any, meta?: any) => {
    try {
      if (meta) {
        this.logger.log('warn', message, { meta });
      } else {
        this.logger.log('warn', message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  public error = async (message: any, meta?: any) => {
    try {
      if (meta) {
        this.logger.log('error', message, { meta });
      } else {
        this.logger.log('error', message);
      }
    } catch (err) {
      console.error(err);
    }
  };
}
