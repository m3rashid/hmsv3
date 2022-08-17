const bcrypt = require("bcrypt");

const prisma = require("../utils/prisma");
const permissions = require("../utils/auth.helpers");
const { issueJWT, revalidateJWT } = require("../utils/jwt.js");

const loginService = async (email, password) => {
  console.log({ email, password });
  if (!email || !password) throw new Error("No credentials");

  const user = await prisma.auth.findUnique({
    where: { email },
  });
  if (!user) throw new Error("User not found");
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) throw new Error("Wrong Credentials");

  const userDetails = await prisma.profile.findUnique({
    where: { id: user.id },
  });
  const { token, refreshToken, expires } = issueJWT(user);

  console.log({ user, userDetails });

  return {
    user: {
      permissions: user.permissions,
      dataValues: user,
    },
    userDetails,
    token,
    refreshToken,
    expires,
  };
};

const signupService = async (email, password, role) => {
  console.log({ email, password, role });
  if (!email || !password || !role) throw new Error("No credentials");

  let allowedActions = [];
  switch (role) {
    case "DOCTOR":
      allowedActions = [
        permissions.SEARCH_DOCTOR,
        permissions.CREATE_PRESCRIPTION,
        permissions.GET_DOCTOR_PATIENTS,
        permissions.GET_DOCTOR_APPOINTMENTS,
        permissions.SEARCH_PATIENT,
        permissions.GET_PATIENT_BY_ID,
      ];
      break;
    case "ADMIN":
      allowedActions = [permissions.ADMIN];
      break;
    case "RECEPTIONIST":
      allowedActions = [
        permissions.SEARCH_DOCTOR,
        permissions.SEARCH_PATIENT,
        permissions.GET_PATIENT_BY_ID,
      ];
      break;
    case "PHARMACIST":
      allowedActions = [
        permissions.REMOVE_MEDICINE,
        permissions.SEARCH_MEDICINES,
        permissions.GET_MEDICINE_BY_ID,
        permissions.EDIT_MEDICINE,
      ];
      break;
    case "INVENTORY_MANAGER":
      allowedActions = [
        permissions.ADD_MEDICINE,
        permissions.EDIT_MEDICINE,
        permissions.REMOVE_MEDICINE,
        permissions.SEARCH_MEDICINES,
        permissions.GET_MEDICINE_BY_ID,
        permissions.SEARCH_OTHER_ASSETS,
        permissions.ADD_OTHER_ASSETS,
        permissions.EDIT_OTHER_ASSETS,
        permissions.REMOVE_OTHER_ASSETS,
        permissions.SEARCH_NON_MEDICINES,
        permissions.ADD_NON_MEDICINES,
        permissions.EDIT_NON_MEDICINES,
        permissions.REMOVE_NON_MEDICINES,
      ];
      break;
    case "CO_ADMIN":
      allowedActions = [
        permissions.CREATE_PATIENT,
        permissions.GET_PATIENT_BY_ID,
        permissions.DELETE_PATIENT,
        permissions.SEARCH_DOCTOR,
      ];
      break;
    case "OTHER":
      allowedActions = [];
      break;
    default:
      allowedActions = [];
      break;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.Auth.create({
    data: {
      email,
      password: hashedPassword,
      permissions: allowedActions,
    },
  });

  console.log({ user });
  return user;
};

const logoutService = async () => {};

const revalidateService = async (refreshToken) => {
  if (!refreshToken) throw new Error("Unauthorized");

  const { valid, expired, payload } = revalidateJWT(refreshToken);

  if (!valid || expired) throw new Error("Unauthorized");
  const payloadid = payload.sub.id;

  const user = await prisma.auth.findUnique({ where: { id: payloadid } });
  if (!user) throw new Error("Unauthorized");

  const userDetails = await prisma.profile.findUnique({
    where: { id: user.id },
  });

  const { token, expires } = issueJWT(user);
  return {
    user: {
      permissions: user.permissions,
      dataValues: user,
    },
    userDetails,
    token,
    expires,
  };
};

module.exports = {
  loginService,
  logoutService,
  signupService,
  revalidateService,
};
