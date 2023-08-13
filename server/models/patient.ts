import mongoose from 'mongoose';
import { MODEL, MODEL_NAMES, MODEL_UTILS } from 'gatekeeper';

const patientSchema = new mongoose.Schema<MODEL.Patient>(
	{
		...MODEL.baseModelSchema,
	},
	{ timestamps: true }
);

export const PatientModel = MODEL_UTILS.paginatedCompiledModel<MODEL.Patient>(
	MODEL_NAMES.patient,
	patientSchema
);
