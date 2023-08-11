import mongoose from 'mongoose';

import { OtherAssets, baseModelSchema, modelNames, paginatedCompiledModel } from './base';

const otherAssetsSchema = new mongoose.Schema<OtherAssets>(
	{
		...baseModelSchema,
		name: { type: String, required: true },
		quantity: { type: Number, required: true },
	},
	{ timestamps: true }
);

export const OtherAssetsModel = paginatedCompiledModel<OtherAssets>(
	modelNames.otherAsset,
	otherAssetsSchema
);
