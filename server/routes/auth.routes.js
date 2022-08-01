const express = require("express");
const router = express.Router();

const {
  login,
  logout,
  revalidate,
  signup,
  createDummy,
} = require("../controllers/auth.js");
const { createUser } = require("../controllers/createUser.js");

router.post("/login", login);

router.post("/signup", signup);

router.post("/logout", logout);

router.post("/revalidate", revalidate);

router.post("/createUser", createUser);

router.post("/dummy", createDummy);

module.exports = {
  router,
};
