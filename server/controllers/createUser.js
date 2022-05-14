import { v4 as uuidv4 } from "uuid";
import db from "../models/index.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const { email, password, role, name } = req.body;
    if (!email || !password || !role || !name) {
      throw new Error("No credentials");
    }
    const userId= uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.Auth.create({
      id:userId,
      name,
      email,
      password: hashedPassword,
      role: role,
    });

    console.log("user created");
    console.log(user);

    console.log(JSON.stringify(user));
    return res.status(200).json({
      message: "User creation Successful",
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
