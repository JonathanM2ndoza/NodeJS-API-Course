import express, { Application } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import { info, error } from './modules/log';
import { usersRoutes } from './routes/v1/user.routes';
import { productsRoutes } from './routes/v1/product.routes';
import { environment } from './config';

const app: Application = express();
const port: number = environment.port;

// ENV
dotenv.config();

// Extend Express Request
declare global {
  namespace Express {
    export interface Request {
      sessionData: any;
    }
  }
}

// BD
mongoose
  .connect(process.env.MONGO_URI!, {
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

// Middleware
app.use(morgan('dev'));
// parse application/json
app.use(bodyParser.json());

// Routes
app.use('/api/v1', usersRoutes);
app.use('/api/v1', productsRoutes);
