import { Request, Response } from 'express';

import { info, error } from '../../modules/log';
import { responseError } from '../../config/response/server.error';
import {
  createProduct,
  getProducts,
  getProductsByUser,
  deleteProduct,
} from '../../services/v1/product.services';

export const createProductC = async (
  req: Request,
  res: Response
): Promise<void> => {
  await createProduct(req)
    .then((data: any) => {
      info(data);
      res.json({
        status: 'OK',
        message: data === null ? 'Product not created, user not found' : data,
      });
    })
    .catch((err) => {
      error(err);
      responseError(res, err.message, 'ERROR', 500);
    });
};

export const getProductsC = async (
  req: Request,
  res: Response
): Promise<void> => {
  await getProducts()
    .then((data: any) => {
      res.send({
        status: 'OK',
        message:
          Array.isArray(data) && data.length ? data : 'Products not found',
      });
    })
    .catch((err) => {
      error(err);
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
      error(err);
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
      error(err);
      responseError(res, err.message, 'ERROR', 500);
    });
};
