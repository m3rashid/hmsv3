import io from 'socket.io-client';

import { SOCKET_URL } from 'globals/config';
import { createContext } from 'react';

export const socket = io(SOCKET_URL);

const socketContext = createContext(null);

export const SocketProvider = socketContext.Provider;
