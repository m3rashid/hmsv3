const express = require("express");

const {
  createPatient,
  deletePatient,
  getPatientById,
  searchPatients,
} = require("../controllers/patient.js");
const permissions = require("../utils/auth.helpers.js");
const { checkAuth, checkRouteAccess } = require("../middlewares/auth.js");

const router = express.Router();

router.post(
  "/create",
  checkAuth,
  checkRouteAccess(permissions.CREATE_PATIENT),
  createPatient
);

router.get(
  "/search",
  checkAuth,
  checkRouteAccess(permissions.SEARCH_PATIENT),
  searchPatients
);

router.get(
  "/:id",
  checkAuth,
  checkRouteAccess(permissions.GET_PATIENT_BY_ID),
  getPatientById
);

router.delete(
  "/:id",
  checkAuth,
  checkRouteAccess(permissions.DELETE_PATIENT),
  deletePatient
);

module.exports = {
  router,
};
