import { Server, Socket as _Socket } from 'socket.io';

import { socketConstants } from './constants';

export interface PartialUser {
	id: string;
	permissions: string[];
	name: string;
	email: string;
}

type Events = typeof socketConstants[keyof typeof socketConstants];

export type ServerToClientEvents = Record<Events, any>;

export type ClientToServerEvents = Record<Events, any>;

export type InterServerEvents = Record<string, any>;

export type SocketData = {
	user: PartialUser
}

export type IO = Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;

export type Socket = _Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
