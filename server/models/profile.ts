import mongoose from 'mongoose';

import { Profile, baseModelSchema, modelNames, paginatedCompiledModel } from './base';

const profileSchema = new mongoose.Schema<Profile>(
	{
		...baseModelSchema,
	},
	{ timestamps: true }
);

export const ProfileModel = paginatedCompiledModel<Profile>(modelNames.profile, profileSchema);
