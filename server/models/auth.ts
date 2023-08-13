import mongoose from 'mongoose';
import { MODEL, MODEL_NAMES, UTILS } from 'gatekeeper';

const authSchema = new mongoose.Schema<MODEL.Auth>(
	{
		...MODEL.baseModelSchema,
		email: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		password: { type: String, required: true },
		permissions: [{ type: String, required: true }],
		profile: { type: String, required: true },
	},
	{ timestamps: true }
);

export const AuthModel = UTILS.paginatedCompiledModel<MODEL.Auth>(MODEL_NAMES.auth, authSchema);
