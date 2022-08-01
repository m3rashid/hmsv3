const { login, logout, revalidate, signup } = require("./auth.js");

const { createUser } = require("./createUser.js");

const { getDoctorAppointments, getDoctorPatients } = require("./doctor.js");

const {
  createPatient,
  deletePatient,
  getPatientById,
  searchPatients,
} = require("./patient.js");

const { createReception } = require("./reception.js");

module.exports = {
  login,
  logout,
  revalidate,
  signup,
  createUser,
  getDoctorAppointments,
  getDoctorPatients,
  createPatient,
  deletePatient,
  getPatientById,
  searchPatients,
  createReception,
};
