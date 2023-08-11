import fs from 'node:fs';
import path from 'node:path';
import JWT from 'jsonwebtoken';
import { NextFunction } from 'express';

import { IO, Socket } from '../utils/types';
import { isProduction } from '../utils/config';

const keys = JSON.parse(fs.readFileSync(path.join(__dirname, '../utils/keys/keys.json')).toString());

export const checkSocketAuth = (socket: Socket, next: NextFunction) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) throw new Error('Auth error');
    const payload = JWT.verify(token, keys.ACCESS_SECRET);

    socket.data.user = payload.sub as any;
    return next();
  } catch (err) {
    console.log('Socket Err', err);
    next(err);
  }
};

export const safeSocket =
  (handler: any) =>
  (io: IO, socket: Socket) =>
  (...args: any[]) => {
    console.log('Socket', socket.id, 'called', handler.name, 'with', ...args);
    Promise.resolve(handler(io, socket)(...args)).catch((err) => {
      console.log('Socket Err', err);
      io.emit('error', {
        message: !isProduction ? err.message || 'An error Occurred' : 'An error Occurred',
      });
    });
  };
