import express from "express";
import {
  createPatient,
  deletePatient,
  getPatientById,
  searchPatients,
} from "../controllers/patient.js";
const router = express.Router();

router.post("/create", createPatient);
router.get("/search", searchPatients);
router.get("/:id", getPatientById);
router.delete("/:id", deletePatient);

export default router;
