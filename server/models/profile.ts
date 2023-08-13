import mongoose from 'mongoose';
import { MODEL, MODEL_NAMES, MODEL_UTILS } from 'gatekeeper';

const profileSchema = new mongoose.Schema<MODEL.Profile>(
	{
		...MODEL.baseModelSchema,
	},
	{ timestamps: true }
);

export const ProfileModel = MODEL_UTILS.paginatedCompiledModel<MODEL.Profile>(
	MODEL_NAMES.profile,
	profileSchema
);
