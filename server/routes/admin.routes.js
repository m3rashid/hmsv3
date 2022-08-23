const express = require("express");

const { useRoute } = require("../utils/errors");
const { checkAuth } = require("../middlewares/auth");
const { getAllUsers, editPermissions } = require("../controllers");

const router = express.Router();

router.post("/all", checkAuth, useRoute(getAllUsers));

router.post("/edit-permissions", checkAuth, useRoute(editPermissions));

module.exports = {
  router,
};
