const express = require("express");

const {
  createAppointment,
  getAppointmentById,
  createPatient,
} = require("../controllers/reception.js");
const { checkAuth } = require("../middlewares/auth.js");

const router = express.Router();

router.post("/create-appointment", checkAuth, createAppointment);

router.post("/create-patient", checkAuth, createPatient);

router.get("/appointment", checkAuth, getAppointmentById);

module.exports = {
  router,
};
