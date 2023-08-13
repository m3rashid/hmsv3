import { NextFunction, Request, Response } from 'express';

import { verifyJWT } from '../utils/jwt';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['authorization'];
    if (!token) throw new Error('No token');

    const { valid, expired, payload } = verifyJWT(token);
    if (!valid || expired) throw new Error('Valid or expired');

    req.user = payload?.sub as any;
    req.isAuthenticated = true;
    req.permissions = (payload?.sub as any)?.permissions;
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
};
