import mongoose from 'mongoose';
import { MODEL, MODEL_NAMES, MODEL_UTILS } from 'gatekeeper';

const otherAssetsSchema = new mongoose.Schema<MODEL.OtherAssets>(
	{
		...MODEL.baseModelSchema,
		name: { type: String, required: true },
		quantity: { type: Number, required: true },
	},
	{ timestamps: true }
);

export const OtherAssetsModel = MODEL_UTILS.paginatedCompiledModel<MODEL.OtherAssets>(
	MODEL_NAMES.otherAsset,
	otherAssetsSchema
);
