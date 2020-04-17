import { productsRoutes } from './product.routes';
import { usersRoutes } from './user.routes';
import { Application } from 'express';

export default (app: Application): void => {
  app.use('/api/v1', usersRoutes);
  app.use('/api/v1', productsRoutes);
};
