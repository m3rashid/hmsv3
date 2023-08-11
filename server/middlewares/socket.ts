import fs from 'node:fs';
import path from 'node:path';
import JWT from 'jsonwebtoken';

import { isProduction } from '../utils/config';
import { NextFunction } from 'express';

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../utils/keys/keys.json')).toString());

export const checkSocketAuth = (socket: any, next: NextFunction) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) throw new Error('Auth error');
    const payload = JWT.verify(token, keys.ACCESS_SECRET);

    socket.user = payload.sub;
    return next();
  } catch (err) {
    console.log('Socket Err', err);
    next(err);
  }
};

export const safeSocket =
  (handler: any) =>
  (io: any, socket: any) =>
  (...args: any[]) => {
    console.log('Socket', socket.id, 'called', handler.name, 'with', ...args);
    Promise.resolve(handler(io, socket)(...args)).catch((err) => {
      console.log('Socket Err', err);
      io.emit('error', {
        message: !isProduction ? err.message || 'An error Occurred' : 'An error Occurred',
      });
    });
  };
