import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { WinstonLogger } from '../modules/logger';
import { environment } from '../config/environment';

const logger = new WinstonLogger('security.ts');

export const isValidHostaname = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const validHosts = environment.validHosts.split(',');
  if (validHosts.includes(req.hostname)) {
    next();
  } else {
    res.status(403).send({ status: 'ERROR', message: 'Access Denied' });
  }
};

export const isAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { token } = req.headers;
    if (!token) {
      throw {
        code: 403,
        message: 'Missing header token',
      };
    }

    const data: any = jwt.verify(token as string, environment.jwtSecret);
    req.sessionData = { userId: data.userId, role: data.role };
    next();
  } catch (err) {
    logger.error(err);
    res.status(err.code || 500).send({ status: 'ERROR', message: err.message });
  }
};

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { role } = req.sessionData;
    if (role !== 'admin') {
      throw {
        code: 403,
        message: 'Invalid role',
      };
    }
    next();
  } catch (err) {
    logger.error(err);
    res.status(err.code || 500).send({ status: 'ERROR', message: err.message });
  }
};
