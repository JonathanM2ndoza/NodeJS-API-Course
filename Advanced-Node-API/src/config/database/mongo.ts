import mongoose from 'mongoose';
import { WinstonLogger } from '../../modules/logger';
import { environment } from '../../config/environment';

export class ConnectionMongoDB {
  logger: WinstonLogger;
  mongoURI: string;

  constructor() {
    this.logger = new WinstonLogger('mongo.ts');
    this.mongoURI = environment.mongoURI;
    this.connectionStatus();
  }

  public connect = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(this.mongoURI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        })
        .then(() => {
          resolve();
        })
        .catch((err) => {
          this.logger.error(err);
          reject(err);
        });
    });
  };

  public close = (): Promise<void> => {
    return mongoose.disconnect();
  };

  connectionStatus = (): void => {
    mongoose.connection.on('connected', () =>
      this.logger.info('Mongoose default connection is open')
    );

    mongoose.connection.on('error', (err) =>
      this.logger.info(
        'Failed to connect to DB ' + this.mongoURI + ' on startup ',
        err
      )
    );

    mongoose.connection.on('disconnected', () =>
      this.logger.info('Mongoose default connection is disconnected')
    );

    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        this.logger.info(
          'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
      });
    });
  };
}
