const {
  loginService,
  logoutService,
  revalidateService,
  signupService,
} = require("./auth.js");

const { createUserService } = require("./createUser.js");

const {
  getDoctorAppointmentsService,
  getDoctorPatientsService,
  createPrescriptionService,
  searchDoctorsService,
} = require("./doctor.js");

const {
  createPatientService,
  deletePatientService,
  getPatientByIdService,
  searchPatientsService,
} = require("./patient.js");

module.exports = {
  loginService,
  logoutService,
  revalidateService,
  signupService,
  createUserService,
  getDoctorAppointmentsService,
  getDoctorPatientsService,
  createPatientService,
  deletePatientService,
  getPatientByIdService,
  searchPatientsService,
  createPrescriptionService,
  searchDoctorsService,
};
