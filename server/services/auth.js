import bcrypt from "bcrypt";

import db from "../models/index.js";
import { issueJWT, revalidateJWT } from "../utils/jwt.js";

export const loginService = async (email, password) => {
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

  return {
    user,
    token,
    refreshToken,
    expires,
  };
};

export const signupService = async (email, password, role, name) => {
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
  return user;
};

export const logoutService = async () => {};

export const revalidateService = async (refreshToken) => {
  if (!refreshToken) throw new Error("Unauthorized");

  const { valid, expired, payload } = revalidateJWT(refreshToken);

  if (!valid || expired) throw new Error("Unauthorized");
  const id = payload.sub.id;

  const user = await db.Auth.findOne({ where: { id } });
  if (!user) throw new Error("Unauthorized");

  const { token, expires } = issueJWT(user);
  return { user, token, expires };
};