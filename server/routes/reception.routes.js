const express = require("express");

const {
  createAppointment,
  getAppointmentById,
  createPatient,
} = require("../controllers/reception.js");
const permissions = require("../utils/auth.helpers");
const { checkAuth, checkRouteAccess } = require("../middlewares/auth.js");

const router = express.Router();

router.post(
  "/create-appointment",
  checkAuth,
  checkRouteAccess(permissions.CREATE_APPOINTMENT),
  createAppointment
);

router.post(
  "/create-patient",
  checkAuth,
  checkRouteAccess(permissions.CREATE_PATIENT),
  createPatient
);

router.get(
  "/appointment",
  checkAuth,
  checkRouteAccess(permissions.GET_APPOINTMENT_BY_ID),
  getAppointmentById
);

module.exports = {
  router,
};
