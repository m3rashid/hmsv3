import mongoose from 'mongoose';
import { MODEL, MODEL_NAMES, UTILS } from 'gatekeeper';

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

export const NonMedicineModel = UTILS.paginatedCompiledModel<MODEL.NonMedicine>(
	MODEL_NAMES.nonMedicine,
	nonMedicineSchema
);
