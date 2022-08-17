const express = require("express");

const {
  getDoctorAppointments,
  getDoctorPatients,
  searchDoctors,
  FillDummy,
  getAppointmentById,
  createPrescriptionByDoctor,
} = require("../controllers/doctor.js");
const { checkAuth } = require("../middlewares/auth.js");

const router = express.Router();

router.get("/get-appointments", checkAuth, getDoctorAppointments);

router.get("/getappointmentbyId", checkAuth, getAppointmentById);

router.get("/search", checkAuth, searchDoctors);

router.post("/dummy", FillDummy);

router.post("/create-prescription", checkAuth, createPrescriptionByDoctor);

router.get("/get-patients", checkAuth, getDoctorPatients);

module.exports = {
  router,
};
