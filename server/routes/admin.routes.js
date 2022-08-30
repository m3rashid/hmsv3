const express = require("express");

const { useRoute } = require("../utils/errors");
const { checkAuth } = require("../middlewares/auth");
const {
  getAllUsers,
  editPermissions,
  updateUser,
  generateHmsReports,
} = require("../controllers");

const router = express.Router();

router.post("/all", checkAuth, useRoute(getAllUsers));

router.post("/edit-permissions", checkAuth, useRoute(editPermissions));

router.post("/update-user", checkAuth, useRoute(updateUser));

router.post(
  "/gen-report",
  // checkAuth,
  useRoute(generateHmsReports)
);

module.exports = {
  router,
};
