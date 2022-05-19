import bcrypt from "bcrypt";

import db from "../models/index.js";
import { issueJWT, revalidateJWT } from "../utils/jwt.js";

export const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) throw new Error("No credentials");

    const user = await db.Auth.findOne({
      where: {
        email,
      },
    });
    if (!user) throw new Error("User not found");

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) throw new Error("Wrong Credentials");

    const { token, refreshToken, expires } = issueJWT(user);
    res.status(200).json({
      message: "Login Successful",
      token,
      refreshToken,
      expires,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
};

export const signup = async (req, res) => {
  try {
    const { email, password, role, name } = req.body;
    if (!email || !password || !role || !name) {
      throw new Error("No credentials");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("creating user");
    const user = await db.Auth.create({
      name,
      email,
      password: hashedPassword,
      role: role,
    });

    console.log("user created");
    console.log(user);

    console.log(JSON.stringify(user));
    return res.status(200).json({
      message: "Signup Successful",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
};

export const logout = (req, res) => {};

export const revalidate = async (req, res) => {
  try {
    const refreshToken = req.headers["authorization"];
    if (!refreshToken) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { valid, expired, payload } = revalidateJWT(refreshToken);

    if (!valid || expired) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const id = payload.sub.id;

    const user = await db.Auth.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { token, expires } = issueJWT(user);

    res.status(200).json({
      message: "Token revalidated",
      token,
      expires,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
};
