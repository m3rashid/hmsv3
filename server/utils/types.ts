import mongoose from 'mongoose';
import { Server, Socket as _Socket } from 'socket.io';

import { SocketConstant, MODEL } from 'gatekeeper';

export type ServerToClientEvents = Record<SocketConstant, any>;

export type ClientToServerEvents = Record<SocketConstant, any>;

export type InterServerEvents = Record<string, any>;

export type SocketData = {
	user: MODEL.PartialUser;
};

export type IO = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;

export type Socket = _Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;

export type ObjectId = string | mongoose.ObjectId;
