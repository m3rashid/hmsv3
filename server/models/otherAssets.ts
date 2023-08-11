import mongoose from 'mongoose';

import { OtherAssets, baseModelSchema, modelNames, paginatedCompiledModel } from './base';

const otherAssetsSchema = new mongoose.Schema<OtherAssets>(
	{
		...baseModelSchema,
	},
	{ timestamps: true }
);

export const OtherAssetsModel = paginatedCompiledModel<OtherAssets>(
	modelNames.otherAsset,
	otherAssetsSchema
);
