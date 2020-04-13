import { Request, Response } from 'express';

import { User } from '../../models/user.model';
import UserSchema from '../../models/user.schema';
import ProductSchema from '../../models/product.schema';

export const createUser = async (
  req: Request,
  res: Response
): Promise<User> => {
  try {
    const { username, email, password, data, role } = req.body;

    const user = new UserSchema();
    user.username = username;
    user.email = email;
    user.password = password;
    user.data = data;
    if (role) user.role = role;
    return await UserSchema.save();
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, email, data } = req.body;
    return await UserSchema.findByIdAndUpdate(req.params.userId, {
      username,
      email,
      data,
    });
  } catch (error) {
    throw error;
  }
};

export const getUser = async (req: Request, res: Response): Promise<any> => {
  try {
    return await UserSchema.findById(req.params.userId);
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (): Promise<any> => {
  try {
    return await UserSchema.find().select({ password: 0, __v: 0, role: 0 });
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    await UserSchema.findByIdAndDelete(req.params.userId);
    await ProductSchema.deleteMany({ user: req.params.userId });
  } catch (error) {
    throw error;
  }
};

export const getUserByOne = async (item: any): Promise<any> => {
  try {
    return await UserSchema.findOne(item);
  } catch (error) {
    throw error;
  }
};
