import mongoose from 'mongoose';

import { Prescription, baseModelSchema, modelNames, paginatedCompiledModel } from './base';

const prescriptionSchema = new mongoose.Schema<Prescription>(
	{
		...baseModelSchema,
	},
	{ timestamps: true }
);

export const PrescriptionModel = paginatedCompiledModel<Prescription>(
	modelNames.prescription,
	prescriptionSchema
);
