import { Request, Response } from 'express';
import ProductSchema from '../../models/product.schema';
import { Product } from '../../models/product.model';

export const createProduct = async (
  req: Request,
  res: Response
): Promise<Product> => {
  try {
    const product = new ProductSchema(req.body);
    return await product.save();
  } catch (error) {
    throw error;
  }
};

export const getProducts = async (
  req: Request,
  res: Response
): Promise<Product> => {
  try {
    const products: any = await ProductSchema.find(/*{ price: { $gt: 2.000 } }*/)
      .select('title desc price')
      .populate('user', 'username email data role');

    return products;
  } catch (error) {
    throw error;
  }
};

export const getProductsByUser = async (
  req: Request,
  res: Response
): Promise<Product> => {
  try {
    const products: any = await ProductSchema.find({
      user: req.params.userId,
    });

    return products;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Product> => {
  try {
    const products: any = await ProductSchema.findByIdAndDelete(
      req.params.productId
    );
    return products;
  } catch (error) {
    throw error;
  }
};
