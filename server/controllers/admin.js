const {
  getAllUsersService,
  editPermissionsService,
  generateReportsService,
  updateUserProfileService,
} = require("../services");
const { permissions } = require("../utils/constants");

const getAllUsers = async (req, res) => {
  if (
    !req.permissions.includes(permissions.ADMIN) &&
    !req.permissions.includes(permissions.GET_ALL_USERS)
  ) {
    throw new Error("Unauthorized for this resource");
  }

  const users = await getAllUsersService(req.body.userRole);

  return res.status(200).json({
    message: "Got users",
    users,
  });
};

const editPermissions = async (req, res) => {
  if (
    !req.permissions.includes(permissions.ADMIN) &&
    !req.permissions.includes(permissions.EDIT_USER_PERMISSIONS)
  ) {
    throw new Error("Unauthorized for this resource");
  }

  const users = await editPermissionsService({
    userId: req.body.userId,
    permissions: req.body.permissions,
    doneBy: req.user,
  });

  return res.status(200).json({
    message: "Got users",
    users,
  });
};

const updateUser = async (req, res) => {
  if (
    !req.permissions.includes(permissions.ADMIN) &&
    !req.permissions.includes(permissions.EDIT_USER_PROFILE)
  ) {
    throw new Error("Unauthorized for this resource");
  }

  console.log(req.body);

  const { auth, profile } = await updateUserProfileService(
    req.body.userId,
    req.body.profileId,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,

      sex: req.body.sex,
      designation: req.body.designation,
      contact: req.body.contact,
      address: req.body.address,
      bio: req.body.bio,
      availability: req.body.availability,
      availableDays: req.body.availableDays,
      roomNumber: req.body.roomNumber,
      authorityName: req.body.authorityName,
      category: req.body.category,
      origin: req.body.origin,
    },
    req.user
  );

  return res.status(200).json({
    auth,
    profile,
  });
};

const generateHmsReports = async (req, res) => {
  // if (!req.permissions.includes(permissions.ADMIN)) {
  //   throw new Error("Unauthorized for this resource");
  // }

  const reports = await generateReportsService({
    startDay: req.body.startDay,
    endDay: req.body.endDay,
    action: req.body.action,
  });

  return res.status(200).json(reports);
};

module.exports = {
  getAllUsers,
  editPermissions,
  updateUser,
  generateHmsReports,
};
