import mongoose from 'mongoose';
import { MODEL, MODEL_NAMES, MODEL_UTILS } from 'gatekeeper';
import { MODEL_CONSTANTS } from 'gatekeeper';

const profileSchema = new mongoose.Schema<MODEL.Profile>(
	{
		...MODEL.baseModelSchema,
		designation: { type: String },
		contact: { type: String },
		address: { type: String },
		bio: { type: String },
		roomNumber: { type: String },
		category: { type: String, required: true, enum: MODEL_CONSTANTS.Categories },
		role: { type: String, required: true, enum: MODEL_CONSTANTS.Roles },
		origin: { type: String },
		auth: { type: mongoose.Schema.Types.ObjectId, ref: MODEL_NAMES.auth },
		availableDays: [{ type: String, required: true, enum: MODEL_CONSTANTS.Days }],
	},
	{ timestamps: true }
);

export const ProfileModel = MODEL_UTILS.paginatedCompiledModel<MODEL.Profile>(
	MODEL_NAMES.profile,
	profileSchema
);
