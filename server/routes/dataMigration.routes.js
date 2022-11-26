const express = require("express");

const { useRoute } = require("../utils/errors");
const { checkAuth } = require("../middlewares/auth");
const { handleDataMigration } = require("../controllers");
const { upload } = require("../utils/upload");

const router = express.Router();

router.post(
  "/",
  checkAuth,
  upload.single("data"),
  useRoute(handleDataMigration)
);

module.exports = {
  router,
};
