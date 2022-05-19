import React from "react"
import io from "socket.io-client";

import { SOCKET_URL } from "./config";

export const socket = io(SOCKET_URL);

const socketContext = React.createContext(null);

export const SocketProvider = socketContext.Provider;
