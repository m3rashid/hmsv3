import mongoose from 'mongoose';
import { MODEL, MODEL_NAMES, MODEL_UTILS } from 'gatekeeper';

const nonMedicineSchema = new mongoose.Schema<MODEL.NonMedicine>(
	{
		...MODEL.baseModelSchema,
		name: { type: String, required: true },
		batchNumber: { type: String },
		expiryDate: { type: Date, required: true },
		quantity: { type: Number, required: true },
	},
	{ timestamps: true }
);

export const NonMedicineModel = MODEL_UTILS.paginatedCompiledModel<MODEL.NonMedicine>(
	MODEL_NAMES.nonMedicine,
	nonMedicineSchema
);
