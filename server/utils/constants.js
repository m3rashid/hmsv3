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
};

const InventoryTypes = {
  Medicine: "Medicine",
  NonMedicine: "NonMedicine",
  OtherAssets: "OtherAssets",
};

module.exports = {
  permissions,
  supportedUserRoles,
  InventoryTypes,
};
