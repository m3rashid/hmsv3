import { NextFunction, Request, Response } from 'express';
import { isProduction } from '../utils/config';

export const globalErrorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res.status(500).json({
    message: !isProduction
      ? JSON.stringify(err.message) || 'Internal Server Error'
      : 'Internal Server Error',
  });
};
