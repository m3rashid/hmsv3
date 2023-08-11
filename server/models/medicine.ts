import mongoose from 'mongoose';

import { Category, MedType, Medicine, baseModelSchema, modelNames, paginatedCompiledModel } from './base';

const medicineSchema = new mongoose.Schema<Medicine>(
	{
		...baseModelSchema,
		batchNumber: { type: String },
		manufacturer: { type: String },
		expiryDate: { type: Date, required: true },
		medType: { type: String, enum: MedType },
		name: { type: String, required: true },
		tabletsPerStrip: { type: Number },
		category: { type: String, enum: Category },
		quantity: { type: Number, required: true },
	},
	{ timestamps: true }
);

export const MedicineModel = paginatedCompiledModel<Medicine>(modelNames.medicine, medicineSchema);
