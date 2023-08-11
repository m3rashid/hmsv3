import mongoose from 'mongoose';

import { Log, baseModelSchema, modelNames, paginatedCompiledModel } from './base';

const logSchema = new mongoose.Schema<Log>(
	{
		...baseModelSchema,
		from: { type: String, required: true },
		action: { type: String, required: true },
		to: { type: String, required: true },
	},
	{ timestamps: true }
);

export const LogModel = paginatedCompiledModel<Log>(modelNames.log, logSchema);
