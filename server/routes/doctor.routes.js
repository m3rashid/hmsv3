const express = require("express");

const {
  getDoctorAppointments,
  getDoctorPatients,
  searchDoctors,
  FillDummy,
  getAppointmentById,
  createPrescriptionByDoctor,
} = require("../controllers/doctor.js");
const permissions = require("../utils/auth.helpers.js");
const { checkAuth, checkRouteAccess } = require("../middlewares/auth.js");

const router = express.Router();

router.get(
  "/get-appointments",
  checkAuth,
  checkRouteAccess(permissions.GET_DOCTOR_APPOINTMENTS),
  getDoctorAppointments
);
router.get(
  "/getappointmentbyId",
  checkAuth,
  checkRouteAccess(permissions.GET_APPOINTMENT_BY_ID),
  getAppointmentById
);
router.get(
  "/search",
  checkAuth,
  checkRouteAccess(permissions.SEARCH_DOCTOR),
  searchDoctors
);
router.post("/dummy", FillDummy);
router.post(
  "/create-prescription",
  checkAuth,
  checkRouteAccess(permissions.CREATE_PRESCRIPTION),
  createPrescriptionByDoctor
);
router.get(
  "/get-patients",
  checkAuth,
  checkRouteAccess(permissions.GET_DOCTOR_PATIENTS),
  getDoctorPatients
);

module.exports = {
  router,
};
