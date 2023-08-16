import mongoose from 'mongoose';
import { MODEL, MODEL_CONSTANTS, MODEL_NAMES, MODEL_UTILS } from 'gatekeeper';

const patientSchema = new mongoose.Schema<MODEL.Patient>(
	{
		...MODEL.baseModelSchema,
		user: { type: mongoose.Schema.Types.ObjectId, ref: MODEL_NAMES.auth },
		name: { type: String },
		fathersName: { type: String },
		type: { type: String, enum: MODEL_CONSTANTS.PatientTypes, required: true },
		otherUser: { type: String },
		sex: { type: String, enum: MODEL_CONSTANTS.Sex, required: true },
		dob: { type: Date },
		designation: { type: String },
		contact: { type: String },
		dor: { type: String },
		department: { type: String },
		fdr: { type: String },
		bloodGroup: { type: String, required: true, enum: MODEL_CONSTANTS.BloodGroups },
		lastVisit: { type: Date },
		address: { type: String },
		dependentStatus: { type: Boolean },
	},
	{ timestamps: true }
);

export const PatientModel = MODEL_UTILS.paginatedCompiledModel<MODEL.Patient>(
	MODEL_NAMES.patient,
	patientSchema
);
