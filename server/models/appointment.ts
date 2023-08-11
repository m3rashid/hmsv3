import mongoose from 'mongoose';

import { Appointment, baseModelSchema, modelNames, paginatedCompiledModel } from './base';

const appointmentSchema = new mongoose.Schema<Appointment>(
	{
		...baseModelSchema,
		doctor: { type: mongoose.Schema.Types.ObjectId, ref: modelNames.auth },
		patient: { type: mongoose.Schema.Types.ObjectId, ref: modelNames.auth },
		pending: { type: Boolean, default: true },
		prescription: { type: mongoose.Schema.Types.ObjectId, ref: modelNames.prescription },
		remarks: { type: String },
		referredBy: { type: mongoose.Schema.Types.ObjectId, ref: modelNames.auth },
	},
	{ timestamps: true }
);

export const AppointmentModel = paginatedCompiledModel<Appointment>(
	modelNames.appointment,
	appointmentSchema
);
