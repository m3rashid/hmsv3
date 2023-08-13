export const MedType = ['TABLET', 'SYRUP'] as const;
export type MedType = (typeof MedType)[number];

export const dosages = {
	OD: 1,
	BD: 2,
	TD: 3,
	QD: 4,
	OW: 1 / 7,
	BW: 2 / 7,
	TW: 3 / 7,
} as const;
export const Dosage = Object.keys(dosages);
export type Dosage = keyof typeof dosages;

export const BloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'UNKNOWN'] as const;
export type BloodGroup = (typeof BloodGroups)[number];

export const Sex = ['M', 'F', 'O'] as const;
export type Sex = (typeof Sex)[number];

export const Categories = [
	'GENERAL_MEDICINE',
	'CARDIOLOGY',
	'DERMATOLOGY',
	'INTERNAL_MEDICINE',
	'OPHTHALMOLOGY',
	'ENT',
	'GYNECOLOGY',
] as const;
export type Category = (typeof Categories)[number];

export const PatientTypes = [
	'EMPLOYEE',
	'STUDENT',
	'PENSIONER',
	'FAMILY_PENSIONER',
	'DEPENDENT',
] as const;
export type PatientType = (typeof PatientTypes)[number];

export const MaritalStatuses = ['SINGLE', 'SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED'] as const;
export type MaritalStatus = (typeof MaritalStatuses)[number];

export const Roles = [
	'DOCTOR',
	'ADMIN',
	'RECEPTIONIST',
	'PHARMACIST',
	'INVENTORY_MANAGER',
	'CO_ADMIN',
	'OTHER',
] as const;
export type Role = (typeof Roles)[number];

export const Days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;
export type Day = (typeof Days)[number];
