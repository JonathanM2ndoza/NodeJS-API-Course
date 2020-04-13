import express from 'express';

import {
  createProductC,
  getProductsC,
  getProductsByUserC,
  deleteProductC,
} from '../../controllers/v1/product.controllers';
import { isValidHostaname } from '../../middlewares/security';

const productsRoutes = express.Router();

productsRoutes.post('/products', isValidHostaname, createProductC);
productsRoutes.get('/products', isValidHostaname, getProductsC);
productsRoutes.get('/products/:userId', isValidHostaname, getProductsByUserC);
productsRoutes.delete('/products/:productId', isValidHostaname, deleteProductC);

export { productsRoutes };
