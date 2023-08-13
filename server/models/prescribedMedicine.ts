import mongoose from 'mongoose';
import { MODEL, MODEL_NAMES, MODEL_UTILS } from 'gatekeeper';

const prescribedMedicineSchema = new mongoose.Schema<MODEL.PrescribedMedicine>(
	{
		...MODEL.baseModelSchema,
	},
	{ timestamps: true }
);

export const PrescribedMedicineModel = MODEL_UTILS.paginatedCompiledModel<MODEL.PrescribedMedicine>(
	MODEL_NAMES.prescribedMedicine,
	prescribedMedicineSchema
);
