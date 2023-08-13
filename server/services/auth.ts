import bcrypt from "bcrypt";

import { CONSTANTS } from "gatekeeper";
import { AuthModel } from "../models/auth";
import { ProfileModel } from "../models/profile";
import { issueJWT, revalidateJWT } from "../utils/jwt";

export const addActions = (role: CONSTANTS.Role) => {
  let allowedActions: string[] = [];
  switch (role) {
    case 'DOCTOR':
      allowedActions = [
        permissions.DOCTOR_APPOINTMENTS,
        permissions.DOCTOR_PRESCRIBE_MEDICINE,
        permissions.PHARMACY_PRESCRIPTIONS,
      ];
      break;
    case 'ADMIN':
      allowedActions = [permissions.ADMIN];
      break;
    case 'RECEPTIONIST':
      allowedActions = [permissions.RECEPTION_ADD_APPOINTMENT, permissions.DOCTOR_APPOINTMENTS];
      break;
    case 'PHARMACIST':
      allowedActions = [permissions.PHARMACY_PRESCRIPTIONS, permissions.PHARMACY_RECEIPT];
      break;
    case 'INVENTORY_MANAGER':
      allowedActions = [permissions.INVENTORY_ADD_MEDICINE, permissions.INVENTORY_VIEW];
      break;
    case 'CO_ADMIN':
      allowedActions = [
        permissions.DOCTOR_APPOINTMENTS,
        permissions.INVENTORY_VIEW,
        permissions.RECEPTION_ADD_APPOINTMENT,
        permissions.RECEPTION_CREATE_PATIENT,
      ];
      break;
    case 'OTHER':
      allowedActions = [];
      break;
    default:
      allowedActions = [];
      break;
  }

  return allowedActions;
};

export const loginService = async (email: string, password: string) => {
  if (!email || !password) throw new Error('No credentials');

	const user = await AuthModel.findOne({ email: email.trim() });
  if (!user) throw new Error('User not found');

	const matched = await bcrypt.compare(password, user.password.trim());
  if (!matched) throw new Error('Wrong Credentials');

  // const userDetails = await prisma.profile.findUnique({
  //   where: { id: user.id },
  // });
	const userDetails = await ProfileModel.findOne({ auth: user._id });
  const { token, refreshToken, expires } = issueJWT(user);

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

export const signupService = async ({
  email,
  password,
  name,
  role,
  sex,
  designation,
  contact,
  address,
  bio,
  availability,
  availableDays,
  roomNumber,
  authorityName,
  category,
  origin,
  doneBy,
}: any) => {
  const profileData = {
    designation,
    contact,
    address,
    bio,
    sex,
    availability,
    role,
    availableDays,
    roomNumber,
    authorityName,
    category,
    origin,
  };

  if (!email || !password || !name || !role || !sex || !roomNumber) {
    throw new Error('Insufficient credentials');
  }

  if (!CONSTANTS.Roles.includes(role)) throw new Error('Invalid role');
  const allowedActions = addActions(role);

  const hashedPassword = await bcrypt.hash(password.trim(), 10);
  const profile = await prisma.profile.create({ data: { ...profileData } });

  const user = await prisma.auth.create({
    data: {
      email: email.trim(),
      name: name.trim(),
      profileId: profile.id,
      password: hashedPassword,
      permissions: allowedActions,
    },
    include: { profile: true },
  });

  await addEventLog({
    action: serverActions.SIGNUP,
    fromId: doneBy?.id ?? -1,
    actionId: profile?.id,
    actionTable: 'profile',
    message: `${doneBy?.name || 'DEV'} <(${doneBy?.email || 'dev@jmi'})> created user ${
      user?.name
    } <(${user?.email})> as ${role}`,
  });

  return user;
};

export const logoutService = async () => {};

export const revalidateService = async (refreshToken: string) => {
  if (!refreshToken) throw new Error('Unauthorized');

  const { valid, expired, payload } = revalidateJWT(refreshToken);

  if (!valid || expired) throw new Error('Unauthorized');
  const payloadId = (payload?.sub as any)?._id;

	const user = await AuthModel.findById(payloadId)
  if (!user) throw new Error('Unauthorized');

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
