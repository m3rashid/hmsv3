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

const createProfileService = async (
  userId,
  designation,
  contact,
  address,
  bio,
  sex,
  availability,
  availableDays,
  roomNumber,
  authorityName,
  category,
  origin
) => {
  if (!userId || !sex) throw new Error("Insufficient data");
  const profile = await prisma.profile.create({
    data: {
      authId: userId,
      designation,
      contact,
      address,
      bio,
      sex,
      availability,
      available_days: availableDays,
      room_number: roomNumber,
      authority_name: authorityName,
      category,
      origin,
    },
  });

  console.log({ profile });
  return profile;
};

module.exports = {
  createUserService,
  createProfileService,
};
