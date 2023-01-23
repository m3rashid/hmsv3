const express = require("express");

const {
  createAppointment,
  getAppointmentById,
  createPatient,
} = require("../controllers");
const { useRoute } = require("../utils/errors");
const { checkAuth } = require("../middlewares/auth");
const { getAllAppointments } = require("../controllers/reception");

const router = express.Router();

router.post("/create-appointment", checkAuth, useRoute(createAppointment));

router.post("/create-patient", checkAuth, useRoute(createPatient));

router.get("/appointment", checkAuth, useRoute(getAppointmentById));

router.get("/appointment/all", checkAuth, useRoute(getAllAppointments));

module.exports = {
  router,
};
