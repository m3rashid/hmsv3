import mongoose from 'mongoose';

import { PrescribedMedicine, baseModelSchema, modelNames, paginatedCompiledModel } from './base';

const prescribedMedicineSchema = new mongoose.Schema<PrescribedMedicine>(
	{
		...baseModelSchema,
	},
	{ timestamps: true }
);

export const PrescribedMedicineModel = paginatedCompiledModel<PrescribedMedicine>(
	modelNames.prescribedMedicine,
	prescribedMedicineSchema
);
