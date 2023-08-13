import mongoose from 'mongoose';
import { MODEL, MODEL_NAMES, UTILS } from 'gatekeeper';

const logSchema = new mongoose.Schema<MODEL.Log>(
	{
		...MODEL.baseModelSchema,
		from: { type: String, required: true },
		action: { type: String, required: true },
		to: { type: String, required: true },
	},
	{ timestamps: true }
);

export const LogModel = UTILS.paginatedCompiledModel<MODEL.Log>(MODEL_NAMES.log, logSchema);
