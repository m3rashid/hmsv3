/// <reference path="index.d.ts" />

import 'dotenv/config';
import cors from 'cors';
import http from 'http';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import { Server } from 'socket.io';
import compression from 'compression';
import { setupWorker } from '@socket.io/sticky';
import { instrument } from '@socket.io/admin-ui';
import { createAdapter } from '@socket.io/cluster-adapter';

import { IO } from './utils/types';
import { prisma } from './utils/prisma';
import { checkSocketAuth } from './middlewares/socket';
import { isProduction, corsOrigin, PORT } from './utils/config';
import { globalErrorHandlerMiddleware } from './middlewares/error';

import { default as socketHandler } from './routes/sockets';
import { default as AuthRoutes } from './routes/auth.routes';
import { default as AdminRoutes } from './routes/admin.routes';
import { default as DoctorRoutes } from './routes/doctor.routes';
import { default as PatientRoutes } from './routes/patient.routes';
import { default as PharmacyRoutes } from './routes/pharmacy.routes';
import { default as ReceptionRoutes } from './routes/reception.routes';
import { default as InventoryRoutes } from './routes/inventory.routes';
import { default as dataMigrationRoutes } from './routes/dataMigration.routes';

const app = express();
app.use(helmet());
app.use(compression());
app.disable('x-powered-by');
const server = http.createServer(app);

const io: IO = new Server(server, {
	cors: {
		origin: corsOrigin,
		methods: ['GET', 'POST'],
		credentials: true,
	},
});

if (isProduction) {
	io.adapter(createAdapter());
	setupWorker(io);
}
io.use(checkSocketAuth);

io.on('connection', (socket: any) => {
	const data = {
		socket_status: 'connected',
		socketId: socket.id,
		userId: socket.data.user.id,
	};

	socket.on('connect', () => console.log(data));
	return socketHandler(io, socket);
});

app.use(cors({ origin: corsOrigin, optionsSuccessStatus: 200 }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 100000 }));
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => res.send('Hello World'));
app.use('/api/auth', AuthRoutes);
app.use('/api/admin', AdminRoutes);
app.use('/api/doctor', DoctorRoutes);
app.use('/api/patient', PatientRoutes);
app.use('/api/reception', ReceptionRoutes);
app.use('/api/inventory', InventoryRoutes);
app.use('/api/pharmacy', PharmacyRoutes);
app.use('/api/data-migration', dataMigrationRoutes);

app.get('/health', (req: Request, res: Response) => {
	const healthCheck = {
		uptime: process.uptime(),
		responseTime: process.hrtime(),
		message: 'OK',
		timestamp: Date.now(),
	};
	try {
		return res.status(200).send(healthCheck);
	} catch (error: any) {
		healthCheck.message = error;
		return res.status(503).send(healthCheck);
	}
});

app.use((req: Request, res: Response, next) => res.status(404).send('Not Found'));
app.use(globalErrorHandlerMiddleware);

const startServer = async () => {
	try {
		instrument(io, { auth: false });
		if (isProduction) console.log = () => {};

		await prisma.$connect();
		console.log('Connection established successfully');
		server.listen(PORT, () => console.log(`Server on :${PORT}`));
	} catch (err) {
		await prisma.$disconnect();
		console.log(err);
		process.exit(1);
	}
};

startServer();
