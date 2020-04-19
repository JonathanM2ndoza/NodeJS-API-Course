import { Request, Response } from 'express';

import { WinstonLogger } from '../../modules/logger';
import { responseError } from '../../config/response/server.error';
import {
  createProduct,
  getProducts,
  getProductsByUser,
  deleteProduct,
} from '../../services/v1/product.services';

const logger = new WinstonLogger('product.controllers.ts');

export const createProductC = async (
  req: Request,
  res: Response
): Promise<void> => {
  await createProduct(req)
    .then((data: any) => {
      logger.debug(data);
      res.json({
        status: 'OK',
        message: data === null ? 'Product not created, user not found' : data,
      });
    })
    .catch((err) => {
      logger.error(err);
      responseError(res, err.message, 'ERROR', 500);
    });
};

export const getProductsC = async (
  req: Request,
  res: Response
): Promise<void> => {
  await getProducts()
    .then((data: any) => {
      logger.debug('data: ',data);
      res.send({
        status: 'OK',
        message:
          Array.isArray(data) && data.length ? data : 'Products not found',
      });
    })
    .catch((err) => {
      logger.error(err);
      responseError(res, err.message, 'ERROR', 500);
    });
};

export const getProductsByUserC = async (
  req: Request,
  res: Response
): Promise<void> => {
  await getProductsByUser(req)
    .then((data: any) => {
      res.send({
        status: 'OK',
        message:
          Array.isArray(data) && data.length ? data : 'Products not found',
      });
    })
    .catch((err) => {
      logger.error(err);
      responseError(res, err.message, 'ERROR', 500);
    });
};

export const deleteProductC = async (
  req: Request,
  res: Response
): Promise<void> => {
  await deleteProduct(req)
    .then((data: any) => {
      res.send({
        status: 'OK',
        message: data === null ? 'Product not found' : data,
      });
    })
    .catch((err) => {
      logger.error(err);
      responseError(res, err.message, 'ERROR', 500);
    });
};
