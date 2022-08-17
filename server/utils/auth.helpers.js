const permissions = {
  // all access to this special role admin
  ADMIN: "ADMIN",

  // admin/co-admin access level
  CREATE_USER: "CREATE_USER",
  CREATE_PATIENT: "CREATE_PATIENT",
  DELETE_PATIENT: "DELETE_PATIENT",

  // doctor/ access level
  CREATE_PRESCRIPTION: "CREATE_PRESCRIPTION",
  GET_DOCTOR_PATIENTS: "GET_DOCTOR_PATIENTS",
  GET_DOCTOR_APPOINTMENTS: "GET_DOCTOR_APPOINTMENTS",

  // inventory-manager/pharmacist access level
  ADD_MEDICINE: "ADD_MEDICINE",
  EDIT_MEDICINE: "EDIT_MEDICINE",
  REMOVE_MEDICINE: "REMOVE_MEDICINE",
  SEARCH_MEDICINES: "SEARCH_MEDICINES",
  GET_MEDICINE_BY_ID: "GET_MEDICINE_BY_ID",

  // inventory manager access level
  SEARCH_OTHER_ASSETS: "SEARCH_OTHER_ASSETS",
  ADD_OTHER_ASSETS: "ADD_OTHER_ASSETS",
  EDIT_OTHER_ASSETS: "EDIT_OTHER_ASSETS",
  REMOVE_OTHER_ASSETS: "REMOVE_OTHER_ASSETS",
  SEARCH_NON_MEDICINES: "SEARCH_NON_MEDICINES",
  ADD_NON_MEDICINES: "ADD_NON_MEDICINES",
  EDIT_NON_MEDICINES: "EDIT_NON_MEDICINES",
  REMOVE_NON_MEDICINES: "REMOVE_NON_MEDICINES",

  // receptionist/doctor access level
  SEARCH_DOCTOR: "SEARCH_DOCTOR",
  SEARCH_PATIENT: "SEARCH_PATIENT",
  GET_PATIENT_BY_ID: "GET_PATIENT_BY_ID",

  // receptionist access level
  CREATE_APPOINTMENT: "CREATE_APPOINTMENT",
  GET_APPOINTMENT_BY_ID: "GET_APPOINTMENT_BY_ID",
};

const checkAccess = (routeAccess, permissions) => {
  if (!routeAccess) return false;
  if (!permissions.includes(routeAccess)) return false;

  return true;
};

module.exports = {
  permissions,
  checkAccess,
};
