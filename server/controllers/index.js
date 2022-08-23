const { editPermissions, getAllUsers } = require("./admin");

const {
  login,
  logout,
  revalidate,
  signup,
  createDummy,
  updateProfile,
} = require("./auth.js");

const {
  getDoctorAppointments,
  getDoctorPatients,
  FillDummy,
  checkMedAvailability,
  createPrescriptionByDoctor,
  getAppointmentById,
  referAnotherDoctor,
  searchDoctors,
} = require("./doctor.js");

const {
  CreateDummyInventory,
  DeleteInventory,
  EditInventory,
  SearchMedicines,
  addMedicine,
} = require("./inventory");

const {
  createPatient,
  deletePatient,
  getPatientById,
  searchPatients,
} = require("./patient.js");

const {
  dispensePrescription,
  getAllPrescriptions,
  getPrescriptionById,
} = require("./pharmacist");

const { createAppointment } = require("./reception");

module.exports = {
  editPermissions,
  getAllUsers,

  login,
  logout,
  revalidate,
  signup,
  createDummy,
  updateProfile,

  getDoctorAppointments,
  getDoctorPatients,
  FillDummy,
  checkMedAvailability,
  createPrescriptionByDoctor,
  getAppointmentById,
  referAnotherDoctor,
  searchDoctors,

  CreateDummyInventory,
  DeleteInventory,
  EditInventory,
  SearchMedicines,
  addMedicine,

  createPatient,
  deletePatient,
  getPatientById,
  searchPatients,

  dispensePrescription,
  getAllPrescriptions,
  getPrescriptionById,

  createAppointment,
};
