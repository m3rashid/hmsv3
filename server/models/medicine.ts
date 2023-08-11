import mongoose from 'mongoose';

import { Medicine, baseModelSchema, modelNames, paginatedCompiledModel } from './base';

const medicineSchema = new mongoose.Schema<Medicine>(
	{
		...baseModelSchema,
	},
	{ timestamps: true }
);

export const MedicineModel = paginatedCompiledModel<Medicine>(modelNames.medicine, medicineSchema);
