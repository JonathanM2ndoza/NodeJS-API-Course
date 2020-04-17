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
};
