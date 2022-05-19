import express from "express";
import { checkAuth } from "../middlewares/auth.js";
import {
  getDoctorAppointments,
  getDoctorPatients,
} from "../controllers/doctor.js";
const router = express.Router();

router.post("/get-appointments", checkAuth, getDoctorAppointments);

router.post("/get-patients", checkAuth, getDoctorPatients);

export default router;
