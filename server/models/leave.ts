import mongoose from 'mongoose';
import { MODEL, MODEL_NAMES, MODEL_UTILS } from 'gatekeeper';

const leaveSchema = new mongoose.Schema<MODEL.Leave>(
	{
		...MODEL.baseModelSchema,
		doctor: { type: mongoose.Schema.Types.ObjectId, ref: MODEL_NAMES.auth },
		endDate: { type: Date, required: true },
		reason: { type: String },
		startDate: { type: Date, required: true },
	},
	{ timestamps: true }
);

export const LeaveModel = MODEL_UTILS.paginatedCompiledModel<MODEL.Leave>(MODEL_NAMES.leave, leaveSchema);
