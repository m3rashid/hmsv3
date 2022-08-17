const express = require("express");

const {
  login,
  logout,
  revalidate,
  signup,
  createDummy,
} = require("../controllers/auth.js");

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.post("/logout", logout);

router.post("/revalidate", revalidate);

router.post("/dummy", createDummy);

module.exports = {
  router,
};
