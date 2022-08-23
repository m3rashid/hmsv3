const express = require("express");

const {
  dispensePrescription,
  getAllPrescriptions,
  getPrescriptionById,
} = require("../controllers");
const { useRoute } = require("../utils/errors");
const { checkAuth } = require("../middlewares/auth");

const router = express.Router();

router.get("/prescriptions", checkAuth, useRoute(getAllPrescriptions));

router.post("/dispense", checkAuth, useRoute(dispensePrescription));

router.get("/prescriptions/:id", checkAuth, useRoute(getPrescriptionById));

module.exports = {
  router,
};
