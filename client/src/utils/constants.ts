import { MODEL_CONSTANTS, Permission } from 'gatekeeper';

export const dosages: Array<{ value: MODEL_CONSTANTS.Dosage; label: string }> = [
	{ value: 'OD', label: 'Once a day' },
	{ value: 'BD', label: 'Twice a day' },
	{ value: 'TD', label: 'Three times a day' },
	{ value: 'QD', label: 'Four times a day' },
	{ value: 'OW', label: 'Once a week' },
	{ value: 'BW', label: 'Twice a week' },
	{ value: 'TW', label: 'Three times a week' },
];

export const allPermissions: Record<Permission, { name: Permission; description: string }> = {
	ADMIN: {
		name: 'ADMIN',
		description: 'Complete control over all the features in the entire app',
	},
	DOCTOR_APPOINTMENTS: {
		name: 'DOCTOR_APPOINTMENTS',
		description: 'Doctor can handle appointments and diagnose patients',
	},
	DOCTOR_PRESCRIBE_MEDICINE: {
		name: 'DOCTOR_PRESCRIBE_MEDICINE',
		description: 'Doctor can prescribe medicines and has read access to the inventory items',
	},
	PHARMACY_PRESCRIPTIONS: {
		name: 'PHARMACY_PRESCRIPTIONS',
		description:
			'Pharmacist has read and write/edit access on the prescriptions created by the doctor',
	},
	PHARMACY_RECEIPT: {
		name: 'PHARMACY_RECEIPT',
		description: 'Pharmacist can create receipts containing details of the diagnosed medicines',
	},
	RECEPTION_ADD_APPOINTMENT: {
		name: 'RECEPTION_ADD_APPOINTMENT',
		description: 'Receptionists can create appointments',
	},
	RECEPTION_CREATE_PATIENT: {
		name: 'RECEPTION_CREATE_PATIENT',
		description: 'Permission to create/register a patient',
	},
	INVENTORY_VIEW: {
		name: 'INVENTORY_VIEW',
		description: 'Permission of read acccess of the inventory items',
	},
	INVENTORY_ADD_MEDICINE: {
		name: 'INVENTORY_ADD_MEDICINE',
		description: 'Permission having write/modify access to the inventory items',
	},
	EDIT_USER_PROFILE: {
		name: 'EDIT_USER_PROFILE',
		description: "Permission to edit any user's profile details",
	},
	EDIT_USER_PERMISSIONS: {
		name: 'EDIT_USER_PERMISSIONS',
		description: "Permissions to edit any user's permissions except the admin",
	},
	GET_ALL_USERS: {
		name: 'GET_ALL_USERS',
		description: 'Permission of read access of all user details in the app',
	},
};
