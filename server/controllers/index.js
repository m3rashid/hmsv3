const {
  createPatient,
  deletePatient,
  getPatientById,
  searchPatients,
} = require("./patient.js");
const { login, logout, revalidate, signup } = require("./auth.js");
const { getDoctorAppointments, getDoctorPatients } = require("./doctor.js");

module.exports = {
  login,
  logout,
  revalidate,
  signup,
  getDoctorAppointments,
  getDoctorPatients,
  createPatient,
  deletePatient,
  getPatientById,
  searchPatients,
};
