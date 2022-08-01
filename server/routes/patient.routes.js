const express = require("express");
const {
  createPatient,
  deletePatient,
  getPatientById,
  searchPatients,
} = require("../controllers/patient.js");
const router = express.Router();

router.post("/create", createPatient);
router.get("/search", searchPatients);
router.get("/:id", getPatientById);
router.delete("/:id", deletePatient);

module.exports = {
  router,
};
