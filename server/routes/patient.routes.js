const express = require("express");

const {
  createPatient,
  deletePatient,
  getPatientById,
  searchPatients,
} = require("../controllers/patient.js");
const { checkAuth } = require("../middlewares/auth.js");

const router = express.Router();

router.post("/create", checkAuth, createPatient);

router.get("/search", checkAuth, searchPatients);

router.get("/:id", checkAuth, getPatientById);

router.delete("/:id", checkAuth, deletePatient);

module.exports = {
  router,
};
