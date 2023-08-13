import mongoose from 'mongoose';
import { MODEL, MODEL_NAMES, MODEL_UTILS } from 'gatekeeper';

const medicineSchema = new mongoose.Schema<MODEL.Medicine>(
	{
		...MODEL.baseModelSchema,
		batchNumber: { type: String },
		manufacturer: { type: String },
		expiryDate: { type: Date, required: true },
		medType: { type: String, enum: MedType },
		name: { type: String, required: true },
		tabletsPerStrip: { type: Number },
		category: { type: String, enum: Category },
		quantity: { type: Number, required: true },
	},
	{ timestamps: true }
);

export const MedicineModel = MODEL_UTILS.paginatedCompiledModel<MODEL.Medicine>(
	MODEL_NAMES.medicine,
	medicineSchema
);
