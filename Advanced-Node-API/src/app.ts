import express, { Application } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import { environment } from './config/environment';
import routes from './routes/v1';
import mongo from './config/database/mongo';

const app: Application = express();
const port: number = environment.port;

// Extend Express Request
declare global {
  namespace Express {
    export interface Request {
      sessionData: any;
    }
  }
}

// BD
mongo(app, environment.mongoURI, port);
// Middleware
app.use(morgan(environment.morganFormat));
// Parse application/json
app.use(bodyParser.json());
// Routes
routes(app);
