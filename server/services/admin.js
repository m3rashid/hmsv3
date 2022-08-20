const prisma = require("../utils/prisma");

const supportedUserRoles = [
  "DOCTOR",
  "ADMIN",
  "RECEPTIONIST",
  "PHARMACIST",
  "INVENTORY_MANAGER",
  "CO_ADMIN",
  "OTHER",
];

const getAllUsersService = async (userRole) => {
  if (!userRole) return [];
  if (!supportedUserRoles.includes(userRole)) {
    throw new Error("Invalid user role");
  }

  const users = await prisma.profile.findMany({
    where: { role: userRole },
    include: { Auth: true },
  });

  return users;
};

const editPermissionsService = async (userId, permissions) => {
  if (!userId || !permissions) throw new Error("Invalid data");
  const user = await prisma.auth.update({
    where: { id: userId },
    data: { permissions },
  });
  return user;
};

module.exports = {
  supportedUserRoles,
  getAllUsersService,
  editPermissionsService,
};
