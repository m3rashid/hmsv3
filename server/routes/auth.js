import express from "express";
const router = express.Router();

import { login, logout, revalidate, signup } from "../controllers/auth.js";

router.post("/login", login);

router.post("/signup", signup);

router.post("/logout", logout);

router.post("/revalidate", revalidate);

export default router;
