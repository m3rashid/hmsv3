const express = require("express");

const {
  login,
  logout,
  revalidate,
  signup,
  createDummy,
} = require("../controllers/auth.js");
const permissions = require("../utils/auth.helpers.js");
const { createUser } = require("../controllers/createUser.js");
const { checkRouteAccess, checkAuth } = require("../middlewares/auth.js");

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.post("/logout", logout);

router.post("/revalidate", revalidate);

router.post(
  "/createUser",
  checkAuth,
  checkRouteAccess(permissions.CREATE_USER),
  createUser
);

router.post("/dummy", createDummy);

module.exports = {
  router,
};
