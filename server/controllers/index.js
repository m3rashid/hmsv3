const { editPermissions, getAllUsers, updateUser } = require("./admin");

const { login, revalidate, signup, createDummy } = require("./auth.js");

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
  updateUser,

  login,
  revalidate,
  signup,
  createDummy,

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
