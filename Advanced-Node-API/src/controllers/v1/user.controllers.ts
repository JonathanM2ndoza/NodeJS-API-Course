import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { info, error } from '../../modules/log';
import { generateHash, comparePassword } from '../../modules/encrypt';
import { environment } from '../../config/environment';
import {
  createUser,
  updateUser,
  getUser,
  getUsers,
  deleteUser,
  getUserByOne,
} from '../../services/v1/user.services';

export const createUserC = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const password = req.body.password;
    const sizeSalt = environment.sizeSalt;
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
    info(user);
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
      message: Array.isArray(users) && users.length ? users : 'Users not found',
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
    const result = await deleteUser(req, res);
    info(result);
    res.send({
      status: 'OK',
      message: result === null ? 'User not found' : 'User deleted',
    });
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

    const tokenExpire = environment.jwtExpireSeconds;
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      environment.jwtSecret,
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
