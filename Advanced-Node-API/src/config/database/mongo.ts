import mongoose from 'mongoose';
import { Application } from 'express';
import { info, error } from '../../modules/log';

export default (app: Application, mongoURI: string, port: number): void => {
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      info('Mongo DB Atlas. Connected');
      app.listen(port, () => {
        info(`NodeJS API listining on port: ${port}`);
      });
    })
    .catch((err) => error(err));

  mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection is open');
  });

  mongoose.connection.on('error', function (err) {
    console.error('Failed to connect to DB ' + mongoURI + ' on startup ', err);
  });

  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection is disconnected');
  });

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log(
        'Mongoose default connection is disconnected due to application termination'
      );
      process.exit(0);
    });
  });
};
