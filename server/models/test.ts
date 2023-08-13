import mongoose from 'mongoose';
import { MODEL, MODEL_NAMES, UTILS } from 'gatekeeper';

const testSchema = new mongoose.Schema<MODEL.Test>(
	{
		...MODEL.baseModelSchema,
	},
	{ timestamps: true }
);

export const TestModel = UTILS.paginatedCompiledModel<MODEL.Test>(MODEL_NAMES.test, testSchema);
