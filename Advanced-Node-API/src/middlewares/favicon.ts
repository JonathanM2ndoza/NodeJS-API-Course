import { Request, Response, NextFunction } from 'express';

export const ignoreFavicon = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).json({ nope: true });
  } else {
    next();
  }
};
