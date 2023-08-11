export {
	editPermissions,
	getAllUsers,
	updateUser,
	generateHmsReports,
	reportDetails,
	getSinglePatientDetails,
} from '../controllers/admin';

export { login, revalidate, signup } from '../controllers/auth';

export {
	getDoctorAppointments,
	getDoctorPatients,
	checkMedAvailability,
	createPrescriptionByDoctor,
	getAppointmentById,
	referAnotherDoctor,
	searchDoctors,
	makeDoctorLeave,
} from '../controllers/doctor';

export {
	CreateDummyInventory,
	DeleteInventory,
	EditInventory,
	SearchMedicines,
	addMedicine,
} from '../controllers/inventory';

export {
	createPatient,
	deletePatient,
	getPatientById,
	searchPatients,
} from '../controllers/patient';

export {
	dispensePrescription,
	getAllPrescriptions,
	getPrescriptionById,
} from '../controllers/pharmacist';

export { createAppointment } from '../controllers/reception';

export { handleDataMigration } from './dataMigration';
