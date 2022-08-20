const express = require("express");

const { checkAuth } = require("../middlewares/auth");
const { getAllUsers, editPermissions } = require("../controllers/admin");

const router = express.Router();

router.post("/all", checkAuth, getAllUsers);
router.post("/edit-permissions", checkAuth, editPermissions);

module.exports = {
  router,
};
