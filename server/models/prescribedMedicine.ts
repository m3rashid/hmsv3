import mongoose from 'mongoose';
import { MODEL, MODEL_NAMES, UTILS } from 'gatekeeper';

const prescribedMedicineSchema = new mongoose.Schema<MODEL.PrescribedMedicine>(
	{
		...MODEL.baseModelSchema,
	},
	{ timestamps: true }
);

export const PrescribedMedicineModel = UTILS.paginatedCompiledModel<MODEL.PrescribedMedicine>(
	MODEL_NAMES.prescribedMedicine,
	prescribedMedicineSchema
);
