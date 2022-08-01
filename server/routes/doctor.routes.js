const express = require("express");
const { checkAuth } = require("../middlewares/auth.js");
const {
  getDoctorAppointments,
  getDoctorPatients,
  searchDoctors,
  FillDummy,
  getAppointmentById,
} = require("../controllers/doctor.js");
const router = express.Router();

router.get("/get-appointments", checkAuth, getDoctorAppointments);
router.get("/getappointmentbyId", checkAuth, getAppointmentById);
router.get("/search", searchDoctors);
router.post("/dummy", FillDummy);

router.post("/get-patients", checkAuth, getDoctorPatients);

module.exports = {
  router,
};
