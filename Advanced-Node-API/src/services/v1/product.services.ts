import { Request, Response } from 'express';
import ProductSchema from '../../models/product.schema';
import { Product } from '../../models/product.model';
import { getUser } from '../../services/v1/user.services';

export const createProduct = async (req: Request): Promise<Product> => {
  const product = new ProductSchema(req.body);
  req.params.userId = req.body.user;

  return await getUser(req)
    .then((data: any) => {
      if (data === null) {
        return data;
      } else {
        return product
          .save()
          .then((data: Product) => {
            return data;
          })
          .catch((error: Error) => {
            throw error;
          });
      }
    })
    .catch((error: Error) => {
      throw error;
    });
};

export const getProducts = async (): Promise<Product[]> =>
  await ProductSchema.find(/*{ price: { $gt: 2.000 } }*/)
    .select('title desc price')
    .populate('user', 'username email data role')
    .then((data: Product[]) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });

export const getProductsByUser = async (req: Request): Promise<Product[]> =>
  await ProductSchema.find({
    user: req.params.userId,
  })
    .then((data: Product[]) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });

export const deleteProduct = async (req: Request): Promise<any> =>
  await ProductSchema.findByIdAndDelete(req.params.productId)
    .then((data: any) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
