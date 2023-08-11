import mongoose from 'mongoose';

import { Leave, baseModelSchema, modelNames, paginatedCompiledModel } from './base';

const leaveSchema = new mongoose.Schema<Leave>(
	{
		...baseModelSchema,
		doctor: { type: mongoose.Schema.Types.ObjectId, ref: modelNames.auth },
		endDate: { type: Date, required: true },
		reason: { type: String },
		startDate: { type: Date, required: true },
	},
	{ timestamps: true }
);

export const LeaveModel = paginatedCompiledModel<Leave>(modelNames.leave, leaveSchema);
