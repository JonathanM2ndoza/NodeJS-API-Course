import { Request, Response } from 'express';

import { info, error } from '../../modules/log';
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
  try {
    const result = await createProduct(req);
    info(result);

    res.send({
      status: 'OK',
      message: result === null ? 'Product not created, user not found' : result,
    });
  } catch (err) {
    error(err);
    res.status(500).send({ status: 'ERROR', message: err.message });
  }
};

export const getProductsC = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await getProducts();
    res.send({
      status: 'OK',
      message:
        Array.isArray(products) && products.length
          ? products
          : 'Products not found',
    });
  } catch (err) {
    error(err);
    res.status(500).send({ status: 'ERROR', message: err.message });
  }
};

export const getProductsByUserC = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await getProductsByUser(req);
    res.send({
      status: 'OK',
      message:
        Array.isArray(products) && products.length
          ? products
          : 'Products not found',
    });
  } catch (err) {
    error(err);
    res.status(500).send({ status: 'ERROR', message: err.message });
  }
};

export const deleteProductC = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await deleteProduct(req);
    res.send({
      status: 'OK',
      message: products === null ? 'Product not found' : products,
    });
  } catch (err) {
    error(err);
    res.status(500).send({ status: 'ERROR', message: err.message });
  }
};
