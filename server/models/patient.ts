import mongoose from 'mongoose';
import { MODEL, MODEL_NAMES, UTILS } from 'gatekeeper';

const patientSchema = new mongoose.Schema<MODEL.Patient>(
	{
		...MODEL.baseModelSchema,
	},
	{ timestamps: true }
);

export const PatientModel = UTILS.paginatedCompiledModel<MODEL.Patient>(
	MODEL_NAMES.patient,
	patientSchema
);
