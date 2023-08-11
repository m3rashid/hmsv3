import paginate from 'mongoose-paginate-v2';
import mongoose, { ObjectId } from 'mongoose';

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

export const MedType = ['TABLET', 'SYRUP'] as const;
export interface Medicine extends Base {
	name: string;
	quantity: number;
	expiryDate: Date;
	batchNumber?: string;
	tabletsPerStrip?: number;
	category?: typeof Category;
	medType?: typeof MedType;
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

export const Dosage = ['OD', 'BD', 'TD', 'QD', 'OW', 'BW', 'TW', 'QW'] as const;
export interface PrescribedMedicine extends Base {
	duration: number;
	description?: string;
	medicine?: Medicine;
	dosage: typeof Dosage;
	quantityPerDose?: string;
	prescription?: Prescription;
}

export const PatientType = [
	'EMPLOYEE',
	'STUDENT',
	'PENSIONER',
	'FAMILY_PENSIONER',
	'DEPENDENT',
	'OTHER',
] as const;
export const BloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'UNKNOWN'] as const;
export interface Patient extends Base {
	user?: string;
	name?: string;
	fathersName?: string;
	type: typeof PatientType;
	otherUser?: string;
	sex: (typeof Sex)[number];
	dob?: string;
	designation?: string;
	contact?: string;
	dor?: string;
	department?: string;
	fdr?: string;
	bloodGroup: (typeof BloodGroup)[number];
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

export const Sex = ['M', 'F', 'O'] as const;
export const Category = [
	'GENERAL_MEDICINE',
	'CARDIOLOGY',
	'DERMATOLOGY',
	'INTERNAL_MEDICINE',
	'OPHTHALMOLOGY',
	'ENT',
	'GYNECOLOGY',
] as const;
export const Role = [
	'DOCTOR',
	'ADMIN',
	'RECEPTIONIST',
	'PHARMACIST',
	'INVENTORY_MANAGER',
	'CO_ADMIN',
	'OTHER',
] as const;
export const Days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;
export interface Profile extends Base {
	designation?: string;
	contact?: string;
	address?: string;
	bio?: string;
	roomNumber?: string;
	sex: (typeof Sex)[number];
	authorityName?: string;
	category: (typeof Category)[number];
	role: (typeof Role)[number];
	origin?: string;
	auth: Auth;
	availableDays: Array<(typeof Days)[number]>;
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

export const modelNames = {
	appointment: 'Appointment',
	auth: 'Auth',
	leave: 'Leave',
	log: 'Log',
	medicine: 'Medicine',
	nonMedicine: 'NonMedicine',
	otherAsset: 'OtherAsset',
	patient: 'Patient',
	prescribedMedicine: 'PrescribedMedicine',
	prescription: 'Prescription',
	profile: 'Profile',
	test: 'Test',
};

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

export type Document<T> = Omit<mongoose.Document, '_id'> & T;
export type PaginateModel<T> = mongoose.PaginateModel<Document<T>>;

export type IDbSchemaKey = keyof ModelSchemasTypes;

export interface PaginatedListIResponse<T> {
	docs: T[];
	totalDocs: number;
	limit: number;
	totalPages: number;
	page: number;
	pagingCounter: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	prevPage: number | null;
	nextPage: number | null;
}

export const paginatedCompiledModel = <T>(
	name: (typeof modelNames)[keyof typeof modelNames],
	schema: mongoose.Schema<T>
) => {
	schema.plugin(paginate);
	return mongoose.model<Document<T>, PaginateModel<T>>(name, schema as any);
};
