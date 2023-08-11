import mongoose from 'mongoose';

import { Test, baseModelSchema, modelNames, paginatedCompiledModel } from './base';

const testSchema = new mongoose.Schema<Test>(
	{
		...baseModelSchema,
	},
	{ timestamps: true }
);

export const TestModel = paginatedCompiledModel<Test>(modelNames.test, testSchema);
