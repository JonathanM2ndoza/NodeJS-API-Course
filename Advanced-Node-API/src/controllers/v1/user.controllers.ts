import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { WinstonLogger } from '../../modules/logger';
import { generateHash, comparePassword } from '../../modules/encrypt';
import { environment } from '../../config/environment';
import { responseError } from '../../config/response/server.error';
import {
  createUser,
  updateUser,
  getUser,
  getUsers,
  deleteUser,
  getUserByOne,
} from '../../services/v1/user.services';

const logger = new WinstonLogger('user.controllers.ts');

export const createUserC = async (
  req: Request,
  res: Response
): Promise<void> => {
  const password = req.body.password;
  const sizeSalt = environment.sizeSalt;
  generateHash(password, sizeSalt)
    .then((hash: any) => {
      req.body.password = hash;
      return createUser(req);
    })
    .then((result: any) => {
      logger.debug('result', result);
      const data = {
        userId: result._id,
        username: result.username,
        email: result.email,
        data: result.data,
        role: result.role,
      };
      res.send({ status: 'OK', message: data });
    })
    .catch((err) => {
      logger.error(err);
      if (err.code && err.code === 11000) {
        responseError(res, err.keyValue, 'DUPLICATED_VALUES', 500);
        return;
      }
      responseError(res, err.message, 'ERROR', 500);
    });
};

export const updateUserC = async (
  req: Request,
  res: Response
): Promise<void> => {
  updateUser(req)
    .then((user: any) => {
      logger.debug('user', user);
      res.send({
        status: 'OK',
        message: user === null ? 'User not found' : 'User updated',
      });
    })
    .catch((err) => {
      logger.error(err);
      responseError(res, err.message, 'ERROR', 500);
    });
};

export const getUserC = async (req: Request, res: Response): Promise<void> => {
  getUser(req)
    .then((user: any) => {
      logger.debug('user', user);
      res.send({
        status: 'OK',
        message: user === null ? 'User not found' : user,
      });
    })
    .catch((err) => {
      logger.error(err);
      responseError(res, err.message, 'ERROR', 500);
    });
};

export const getUsersC = async (req: Request, res: Response): Promise<void> => {
  getUsers()
    .then((users: any) => {
      logger.debug('users', users);
      res.send({
        status: 'OK',
        message:
          Array.isArray(users) && users.length ? users : 'Users not found',
      });
    })
    .catch((err) => {
      logger.error(err);
      responseError(res, err.message, 'ERROR', 500);
    });
};

export const deleteUserC = async (
  req: Request,
  res: Response
): Promise<void> => {
  deleteUser(req)
    .then((user: any) => {
      res.send({
        status: 'OK',
        message: user === null ? 'User not found' : 'User deleted',
      });
    })
    .catch((err) => {
      logger.error(err);
      responseError(res, err.message, 'ERROR', 500);
    });
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await getUserByOne({ email });
    if (!user) {
      responseError(res, 'User not found', 'ERROR', 401);
      return;
    }

    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      responseError(res, 'Invalid password', 'ERROR', 403);
      return;
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
    logger.error(err);
    responseError(res, err.message, 'ERROR', 500);
  }
};
