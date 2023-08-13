import mongoose from 'mongoose';
import { MODEL, MODEL_NAMES, UTILS } from 'gatekeeper';

const profileSchema = new mongoose.Schema<MODEL.Profile>(
	{
		...MODEL.baseModelSchema,
	},
	{ timestamps: true }
);

export const ProfileModel = UTILS.paginatedCompiledModel<MODEL.Profile>(
	MODEL_NAMES.profile,
	profileSchema
);
