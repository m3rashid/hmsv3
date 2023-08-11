import mongoose from 'mongoose';

import { NonMedicine, baseModelSchema, modelNames, paginatedCompiledModel } from './base';

const nonMedicineSchema = new mongoose.Schema<NonMedicine>(
	{
		...baseModelSchema,
	},
	{ timestamps: true }
);

export const NonMedicineModel = paginatedCompiledModel<NonMedicine>(
	modelNames.nonMedicine,
	nonMedicineSchema
);
