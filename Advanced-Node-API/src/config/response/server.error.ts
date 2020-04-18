import { Response } from 'express';

export const responseError = (
  res: Response,
  message: any,
  statusMessage: string,
  status: number
): void => {
  res.status(status).send({ status: statusMessage, message: message });
};
