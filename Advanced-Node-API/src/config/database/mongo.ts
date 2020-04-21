import mongoose from 'mongoose';
import { WinstonLogger } from '../../modules/logger';
import { environment } from '../../config/environment';

const logger = new WinstonLogger('mongo.ts');
const mongoURI = environment.mongoURI;

export const connect = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        logger.error(err);
        reject(err);
      });
  });
};

export const close = (): Promise<void> => {
  return mongoose.disconnect();
};

mongoose.connection.on('connected', () =>
  logger.info('Mongoose default connection is open')
);

mongoose.connection.on('error', (err) =>
  logger.info('Failed to connect to DB ' + mongoURI + ' on startup ', err)
);

mongoose.connection.on('disconnected', () =>
  logger.info('Mongoose default connection is disconnected')
);

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info(
      'Mongoose default connection is disconnected due to application termination'
    );
    process.exit(0);
  });
});
