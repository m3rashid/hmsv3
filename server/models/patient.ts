import mongoose from 'mongoose';

import { Patient, baseModelSchema, modelNames, paginatedCompiledModel } from './base';

const patientSchema = new mongoose.Schema<Patient>(
	{
		...baseModelSchema,
	},
	{ timestamps: true }
);

export const PatientModel = paginatedCompiledModel<Patient>(modelNames.patient, patientSchema);
