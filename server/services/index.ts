export {
	editPermissionsService,
	getAllUsersService,
	generateReportsService,
	updateUserProfileService,
	getReportDetailsService,
	getSinglePatientDetailsService,
} from './admin';

export {
  loginService,
  logoutService,
  revalidateService,
  signupService,
} from '../services/auth';

export {
  getDoctorAppointmentsService,
  getDoctorPatientsService,
  createPrescriptionService,
  searchDoctorsService,
  checkMedAvailabilityService,
  referAnotherDoctorAppointmentService,
  updateAppointmentService,
  getPrescriptionByAppointmentService,
} from './doctor';

export {
  DeleteInventoryService,
  addDummy,
  addMedicineService,
  editMedicineService,
  getMedicine,
  searchInventoryService,
} from './inventory';

export {
  addTest,
  deleteTest,
  editTest,
  getAllTests,
  getTest,
  getTestsByType,
} from './lab';

export {
  createPatientService,
  deletePatientService,
  getPatientByIdService,
  searchPatientsService,
} from './patient';

export {
  dispensePrescriptionService,
  getAllPrescriptionsService,
  getPrescriptionByIdService,
} from './pharmacist';

export { createAppointmentService, getAppointmentByIdService } from './reception';
