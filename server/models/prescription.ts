import mongoose from 'mongoose';
import { MODEL, MODEL_NAMES, UTILS } from 'gatekeeper';

const prescriptionSchema = new mongoose.Schema<MODEL.Prescription>(
	{
		...MODEL.baseModelSchema,
	},
	{ timestamps: true }
);

export const PrescriptionModel = UTILS.paginatedCompiledModel<MODEL.Prescription>(
	MODEL_NAMES.prescription,
	prescriptionSchema
);
