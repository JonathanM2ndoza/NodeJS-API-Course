import mongoose from 'mongoose';
import { Application } from 'express';
import { WinstonLogger } from '../../modules/logger';

const logger = new WinstonLogger('mongo.ts');

export default (app: Application, mongoURI: string, port: number): void => {
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      logger.info('Mongo DB Atlas. Connected');
      app.listen(port, () => {
        logger.info(`NodeJS API listining on port: ${port}`);
      });
    })
    .catch((err) => logger.error(err));

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
};
