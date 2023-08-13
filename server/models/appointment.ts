import mongoose from 'mongoose';
import { MODEL, MODEL_NAMES, MODEL_UTILS } from 'gatekeeper';


const appointmentSchema = new mongoose.Schema<MODEL.Appointment>(
	{
		...MODEL.baseModelSchema,
		doctor: { type: mongoose.Schema.Types.ObjectId, ref: MODEL_NAMES.auth },
		patient: { type: mongoose.Schema.Types.ObjectId, ref: MODEL_NAMES.auth },
		pending: { type: Boolean, default: true },
		prescription: { type: mongoose.Schema.Types.ObjectId, ref: MODEL_NAMES.prescription },
		remarks: { type: String },
		referredBy: { type: mongoose.Schema.Types.ObjectId, ref: MODEL_NAMES.auth },
	},
	{ timestamps: true }
);

export const AppointmentModel = MODEL_UTILS.paginatedCompiledModel<MODEL.Appointment>(
	MODEL_NAMES.appointment,
	appointmentSchema
);
