const bcrypt = require("bcrypt");

const prisma = require("../utils/prisma");

const createUserService = async (email, password, role, name) => {
  if (!email || !password || !role || !name) throw new Error("No credentials");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.Auth.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: role,
    },
  });

  console.log(user);
  return { user };
};

module.exports = {
  createUserService,
};
