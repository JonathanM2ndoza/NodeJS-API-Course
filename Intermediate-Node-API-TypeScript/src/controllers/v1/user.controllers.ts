import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { info, error } from '../../modules/log';
import { generateHash, comparePassword } from '../../modules/encrypt';
import {
  createUser,
  updateUser,
  getUser,
  getUsers,
  deleteUser,
  getUserByOne,
} from '../../services/v1/user.services';

dotenv.config();

export const createUserC = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const password = req.body.password;
    const sizeSalt = Number(process.env.SIZE_SALT);
    const hash = await generateHash(password, sizeSalt);

    req.body.password = hash;

    const result = await createUser(req, res);
    info(result);
    const data = {
      userId: result._id,
      username: result.username,
      email: result.email,
      data: result.data,
      role: result.role,
    };

    res.send({ status: 'OK', message: data });
  } catch (err) {
    error(err);
    if (err.code && err.code === 11000) {
      res
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', message: err.keyValue });
      return;
    }
    res.status(500).send({ status: 'ERROR', message: err.message });
  }
};

export const updateUserC = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await updateUser(req, res);
    info(user);
    res.send({
      status: 'OK',
      message: user === null ? 'User not found' : 'User updated',
    });
  } catch (err) {
    error(err);
    if (err.code && err.code === 11000) {
      res
        .status(400)
        .send({ status: 'DUPLICATED_VALUES', message: err.keyValue });
      return;
    }
    res.status(500).send({ status: 'ERROR', message: err.message });
  }
};

export const getUserC = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await getUser(req, res);
    res.send({
      status: 'OK',
      message: user === null ? 'User not found' : user,
    });
  } catch (err) {
    error(err);
    res.status(500).send({ status: 'ERROR', message: err.message });
  }
};

export const getUsersC = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getUsers();
    info(users);
    res.send({
      status: 'OK',
      message: users.length === 0 ? 'Users not found' : users,
    });
  } catch (err) {
    error(err);
    res.status(500).send({ status: 'ERROR', message: err.message });
  }
};

export const deleteUserC = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await deleteUser(req, res);
    res.send({ status: 'OK', message: 'User deleted' });
  } catch (err) {
    error(err);
    res.status(500).send({ status: 'ERROR', message: err.message });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await getUserByOne({ email });
    if (!user) {
      return res
        .status(401)
        .send({ status: 'ERROR', message: 'User not found' });
    }

    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return res
        .status(403)
        .send({ status: 'ERROR', message: 'Invalid password' });
    }

    const tokenExpire = Number(process.env.JWT_EXPIRE_SECONDS);
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: tokenExpire }
    );
    res.send({
      status: 'OK',
      message: {
        token,
        tokenExpire,
      },
    });
  } catch (err) {
    error(err);
    res.status(500).send({ status: 'ERROR', message: err.message });
  }
};
