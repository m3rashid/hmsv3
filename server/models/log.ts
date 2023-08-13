import mongoose from 'mongoose';
import { MODEL, MODEL_NAMES, MODEL_UTILS } from 'gatekeeper';

const logSchema = new mongoose.Schema<MODEL.Log>(
	{
		...MODEL.baseModelSchema,
		from: { type: String, required: true },
		action: { type: String, required: true },
		to: { type: String, required: true },
	},
	{ timestamps: true }
);

export const LogModel = MODEL_UTILS.paginatedCompiledModel<MODEL.Log>(MODEL_NAMES.log, logSchema);
