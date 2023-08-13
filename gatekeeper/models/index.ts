import mongoose, { ObjectId } from 'mongoose';
import { BloodGroup, Category, Day, Dosage, MedType, PatientType, Role, Sex } from './constants';

export interface Base {
	_id: ObjectId | string;
	createdAt: string;
	updatedAt: string;
	createdBy: Auth;
	isDeleted: boolean;
	lastUpdatedBy: Auth;
}

export const baseModelSchema = {
	isDeleted: { type: Boolean, default: false },
	createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
};

export interface Appointment extends Base {
	referredBy?: Profile;
	prescription?: Prescription;
	patient?: Patient;
	doctor?: Profile;
	pending: boolean;
	remarks?: string;
}

export interface Auth extends Base {
	name: string;
	email: string;
	password: string;
	permissions: string[];
	profile: Profile;
}

export interface Leave extends Base {
	doctor: Profile;
	reason: string;
	startDate: Date;
	endDate: Date;
}

export interface Log extends Base {
	action: string;
	from: string;
	to: string;
}

export interface Medicine extends Base {
	name: string;
	quantity: number;
	expiryDate: Date;
	batchNumber?: string;
	tabletsPerStrip?: number;
	category?: Category;
	medType?: MedType;
	manufacturer?: string;
}

export interface NonMedicine extends Base {
	name: string;
	expiryDate: Date;
	quantity: number;
	batchNumber?: string;
}

export interface OtherAssets extends Base {
	name: string;
	quantity: number;
}

export interface PrescribedMedicine extends Base {
	duration: number;
	description?: string;
	medicine?: Medicine;
	dosage: Dosage;
	quantityPerDose?: string;
	prescription?: Prescription;
}

export interface Patient extends Base {
	user?: string;
	name?: string;
	fathersName?: string;
	type: PatientType;
	otherUser?: string;
	sex: Sex;
	dob?: string;
	designation?: string;
	contact?: string;
	dor?: string;
	department?: string;
	fdr?: string;
	bloodGroup: BloodGroup;
	lastVisit?: string;
	address?: string;
	dependentStatus: boolean;
	// relationWithOtherUser String        @default("SELF")
	// maritalStatus         MaritalStatus @default(SINGLE)
	// userData              Json?
	// Appointment           Appointment[]
}

export interface Prescription extends Base {
	symptoms: string;
	appointment?: Appointment;
	pending: boolean;
	tests: Test[];
	medicines: PrescribedMedicine[];
}

export interface Profile extends Base {
	designation?: string;
	contact?: string;
	address?: string;
	bio?: string;
	roomNumber?: string;
	sex: Sex;
	authorityName?: string;
	category: Category;
	role: Role;
	origin?: string;
	auth: Auth;
	availableDays: Array<Day>;
	// availability         Json? // time range
	// leave                Leave[]
	// Appointment          Appointment[] @relation("doctor")
	// ReferredAppointments Appointment[] @relation("referredDoc")
}

export interface Test extends Base {
	name: string;
	description?: string;
	prescription?: Prescription;
	testType?: string;
	testResultDocs?: string[]; // link of the documents
}

export type ModelSchemasTypes = {
	appointment: Appointment;
	auth: Auth;
	leave: Leave;
	log: Log;
	medicine: Medicine;
	nonMedicine: NonMedicine;
	otherAsset: OtherAssets;
	patient: Patient;
	prescribedMedicine: PrescribedMedicine;
	prescription: Prescription;
	profile: Profile;
	test: Test;
};

export type IDbSchemaKey = keyof ModelSchemasTypes;
