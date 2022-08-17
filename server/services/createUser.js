const bcrypt = require("bcrypt");

const prisma = require("../utils/prisma");

const createUserService = async (email, password, permissions, name) => {
  if (!email || !password || !permissions || !name)
    throw new Error("Insufficient credentials");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.auth.create({
    data: {
      name,
      email,
      permissions,
      password: hashedPassword,
    },
  });

  console.log({ user });
  return { user };
};

module.exports = {
  createUserService,
};
