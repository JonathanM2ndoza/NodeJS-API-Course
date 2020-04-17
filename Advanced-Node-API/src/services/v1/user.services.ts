import { Request } from 'express';

import { User } from '../../models/user.model';
import UserSchema from '../../models/user.schema';
import ProductSchema from '../../models/product.schema';

export const createUser = async (req: Request): Promise<User> => {
  const { username, email, password, data, role } = req.body;

  const user = new UserSchema();
  user.username = username;
  user.email = email;
  user.password = password;
  user.data = data;
  if (role) user.role = role;

  return await user
    .save()
    .then((data: User) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
};

export const updateUser = async (req: Request): Promise<any> => {
  const { username, email, data } = req.body;
  return await UserSchema.findByIdAndUpdate(req.params.userId, {
    username,
    email,
    data,
  })
    .then((data: any) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
};

export const getUser = async (req: Request): Promise<any> =>
  await UserSchema.findById(req.params.userId)
    .then((data: any) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });

export const getUsers = async (): Promise<any> =>
  await UserSchema.find()
    .select({ password: 0, __v: 0, role: 0 })
    .then((data: any) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });

export const deleteUser = async (req: Request): Promise<any> =>
  await UserSchema.findByIdAndDelete(req.params.userId)
    .then(async (data: any) => {
      if (data === null) {
        return data;
      } else {
        return await ProductSchema.deleteMany({ user: req.params.userId })
          .then((data: any) => {
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

export const getUserByOne = async (item: any): Promise<any> =>
  await UserSchema.findOne(item)
    .then((data: any) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
