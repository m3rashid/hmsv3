const express = require("express");

const { useRoute } = require("../utils/errors");
const { checkAuth } = require("../middlewares/auth");
const {
  getAllUsers,
  editPermissions,
  updateUser,
  generateHmsReports,
  reportDetails,
  getSinglePatientDetails,
} = require("../controllers");

const router = express.Router();

router.post("/all", checkAuth, useRoute(getAllUsers));

router.post("/edit-permissions", checkAuth, useRoute(editPermissions));

router.post("/update-user", checkAuth, useRoute(updateUser));

router.post(
  "/single-patient-details",
  checkAuth,
  useRoute(getSinglePatientDetails)
);

router.post(
  "/gen-report",
  // checkAuth,
  useRoute(generateHmsReports)
);

router.post(
  "/report-details",
  // checkAuth,
  useRoute(reportDetails)
);

module.exports = {
  router,
};
