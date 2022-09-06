const express = require("express");

const { login, revalidate, signup } = require("../controllers");
const { useRoute } = require("../utils/errors.js");
const { checkAuth } = require("../middlewares/auth");

const router = express.Router();

router.post("/login", useRoute(login));

router.post("/signup", checkAuth, useRoute(signup));

router.post("/revalidate", useRoute(revalidate));

module.exports = {
  router,
};
