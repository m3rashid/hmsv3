const supportedUserRoles = [
  "DOCTOR",
  "ADMIN",
  "RECEPTIONIST",
  "PHARMACIST",
  "INVENTORY_MANAGER",
  "CO_ADMIN",
  "OTHER",
];

const permissions = {
  // all access to this special role admin
  ADMIN: "ADMIN",
  DOCTOR_APPOINTMENTS: "DOCTOR_APPOINTMENTS",
  DOCTOR_PRESCRIBE_MEDICINE: "DOCTOR_PRESCRIBE_MEDICINE",
  PHARMACY_PRESCRIPTIONS: "PHARMACY_PRESCRIPTIONS",
  PHARMACY_RECEIPT: "PHARMACY_RECEIPT",
  RECEPTION_ADD_APPOINTMENT: "RECEPTION_ADD_APPOINTMENT",
  RECEPTION_CREATE_PATIENT: "RECEPTION_CREATE_PATIENT",
  INVENTORY_VIEW: "INVENTORY_VIEW",
  INVENTORY_ADD_MEDICINE: "INVENTORY_ADD_MEDICINE",

  // new Added
  EDIT_USER_PROFILE: "EDIT_USER_PROFILE",
  EDIT_USER_PERMISSIONS: "EDIT_USER_PERMISSIONS",
  GET_ALL_USERS: "GET_ALL_USERS",
};

const InventoryTypes = {
  Medicine: "Medicine",
  NonMedicine: "NonMedicine",
  OtherAssets: "OtherAssets",
};

const dosages = {
  OD: 1,
  BD: 2,
  TD: 3,
  QD: 4,
  OW: 1 / 7,
  BW: 2 / 7,
  TW: 3 / 7,
};

const socketConstants = {
  receptionistLeft: "receptionist-left",
  doctorLeft: "doctor-left",
  pharmacistLeft: "pharmacist-left",
  createUser: "create-user",
  getDoctorAppointments: "get-doctor-appointments",
  getDoctorPatients: "get-doctor-patients",
  createPatient: "create-patient",
  deletePatient: "delete-patient",
  getPatientById: "get-patient-by-id",
  searchPatients: "search-patients",
  createReceptionist: "create-receptionist",
  createAppointment: "create-appointment",
  createPrescriptionByDoctor: "create-prescription-by-doctor",
  dispensePrescription: "dispense-prescription",

  // not handled
  foundDoctorAppointments: "found-doctor-appointments",
  foundDoctorPatients: "found-doctor-patients",
  newPatientCreated: "new-patient-created",
  patientDeleteSuccess: "patient-delete-success",
  patientFound: "patient-found",

  // left
  receptionistLeft: "receptionist-left",
  doctorLeft: "doctor-left",
  pharmacistLeft: "pharmacist-left",
};

const serverActions = {
  SIGNUP: "SIGNUP",
  CREATE_PRESCRIPTION: "CREATE_PRESCRIPTION",
  UPDATE_APPOINTMENT: "UPDATE_APPOINTMENT",
  REFER_TO_ANOTHER_DOCTOR: "REFER_TO_ANOTHER_DOCTOR",

  ADD_INVENTORY: "ADD_INVENTORY",
  DELETE_INVENTORY: "DELETE_INVENTORY",
  EDIT_INVENTORY: "EDIT_INVENTORY",

  CREATE_TEST: "CREATE_TEST",
  EDIT_TEST: "EDIT_TEST",
  DELETE_TEST: "DELETE_TEST",

  CREATE_PATIENT: "CREATE_PATIENT",
  DELETE_PATIENT: "DELETE_PATIENT",
  UPDATE_PRESCRIPTION: "UPDATE_PRESCRIPTION",

  CREATE_APPOINTMENT: "CREATE_APPOINTMENT",
};

module.exports = {
  permissions,
  supportedUserRoles,
  InventoryTypes,
  dosages,
  socketConstants,
  serverActions,
};
