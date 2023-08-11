export const permissions = {
	ADMIN: 'ADMIN',
	DOCTOR_APPOINTMENTS: 'DOCTOR_APPOINTMENTS',
	DOCTOR_PRESCRIBE_MEDICINE: 'DOCTOR_PRESCRIBE_MEDICINE',
	PHARMACY_PRESCRIPTIONS: 'PHARMACY_PRESCRIPTIONS',
	PHARMACY_RECEIPT: 'PHARMACY_RECEIPT',
	RECEPTION_ADD_APPOINTMENT: 'RECEPTION_ADD_APPOINTMENT',
	RECEPTION_CREATE_PATIENT: 'RECEPTION_CREATE_PATIENT',
	INVENTORY_VIEW: 'INVENTORY_VIEW',
	INVENTORY_ADD_MEDICINE: 'INVENTORY_ADD_MEDICINE',
	EDIT_USER_PROFILE: 'EDIT_USER_PROFILE',
	EDIT_USER_PERMISSIONS: 'EDIT_USER_PERMISSIONS',
	GET_ALL_USERS: 'GET_ALL_USERS',
} as const;

export const InventoryTypes = {
	Medicine: 'Medicine',
	NonMedicine: 'NonMedicine',
	OtherAssets: 'OtherAssets',
} as const;

export const socketConstants = {
	receptionistLeft: 'receptionist-left',
	doctorLeft: 'doctor-left',
	pharmacistLeft: 'pharmacist-left',
	getDoctorAppointments: 'get-doctor-appointments',
	getDoctorPatients: 'get-doctor-patients',
	createPatient: 'create-patient',
	deletePatient: 'delete-patient',
	getPatientById: 'get-patient-by-id',
	searchPatients: 'search-patients',
	createAppointment: 'create-appointment',
	dispensePrescription: 'dispense-prescription',
	createPrescriptionByDoctor: 'create-prescription-by-doctor',
	createUser: 'create-user',
	createReceptionist: 'create-receptionist',
	referAnotherDoctor: "refer-another-doctor",
	error: 'error',
	// not handled
	foundDoctorAppointments: 'found-doctor-appointments',
	foundDoctorPatients: 'found-doctor-patients',
	newPatientCreated: 'new-patient-created',
	patientDeleteSuccess: 'patient-delete-success',
	patientFound: 'patient-found',
	patientsFound: 'patients-found',
	newAppointmentCreated: 'new-appointment-created'
} as const;

export const serverActions = {
	SIGNUP: 'SIGNUP',
	CREATE_PRESCRIPTION: 'CREATE_PRESCRIPTION',
	UPDATE_APPOINTMENT: 'UPDATE_APPOINTMENT',
	REFER_TO_ANOTHER_DOCTOR: 'REFER_TO_ANOTHER_DOCTOR',

	ADD_INVENTORY: 'ADD_INVENTORY',
	DELETE_INVENTORY: 'DELETE_INVENTORY',
	EDIT_INVENTORY: 'EDIT_INVENTORY',

	CREATE_TEST: 'CREATE_TEST',
	EDIT_TEST: 'EDIT_TEST',
	DELETE_TEST: 'DELETE_TEST',

	CREATE_PATIENT: 'CREATE_PATIENT',
	DELETE_PATIENT: 'DELETE_PATIENT',
	UPDATE_PRESCRIPTION: 'UPDATE_PRESCRIPTION',

	CREATE_APPOINTMENT: 'CREATE_APPOINTMENT',

	EDIT_PERMISSIONS: 'EDIT_PERMISSIONS',
	UPDATE_PROFILE: 'UPDATE_PROFILE',

	CREATE_DOCTOR_LEAVE: 'CREATE_DOCTOR_LEAVE',

	UPDATE_PERMISSIONS: 'UPDATE_PERMISSIONS',

	UPDATE_CONFIG: 'UPDATE_CONFIG',
} as const;
