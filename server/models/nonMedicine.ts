import mongoose from 'mongoose';

import { NonMedicine, baseModelSchema, modelNames, paginatedCompiledModel } from './base';

const nonMedicineSchema = new mongoose.Schema<NonMedicine>(
	{
		...baseModelSchema,
		name: { type: String, required: true },
		batchNumber: { type: String },
		expiryDate: { type: Date, required: true },
		quantity: { type: Number, required: true },
	},
	{ timestamps: true }
);

export const NonMedicineModel = paginatedCompiledModel<NonMedicine>(
	modelNames.nonMedicine,
	nonMedicineSchema
);
