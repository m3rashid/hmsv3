import mongoose from 'mongoose';

import { Auth, baseModelSchema, modelNames, paginatedCompiledModel } from './base';

const authSchema = new mongoose.Schema<Auth>(
	{
		...baseModelSchema,
		email: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		password: { type: String, required: true },
		permissions: [{ type: String, required: true }],
		profile: { type: String, required: true },
	},
	{ timestamps: true }
);

export const AuthModel = paginatedCompiledModel<Auth>(modelNames.auth, authSchema);
