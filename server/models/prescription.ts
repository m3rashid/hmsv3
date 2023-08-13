import mongoose from 'mongoose';
import { MODEL, MODEL_NAMES, MODEL_UTILS } from 'gatekeeper';

const prescriptionSchema = new mongoose.Schema<MODEL.Prescription>(
	{
		...MODEL.baseModelSchema,
	},
	{ timestamps: true }
);

export const PrescriptionModel = MODEL_UTILS.paginatedCompiledModel<MODEL.Prescription>(
	MODEL_NAMES.prescription,
	prescriptionSchema
);
