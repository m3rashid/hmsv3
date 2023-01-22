const {
  getAllUsersService,
  editPermissionsService,
  generateReportsService,
  updateUserProfileService,
  getReportDetailsService,
  getSinglePatientDetailsService,
} = require("../services");
const { getConfig, setConfig } = require("../services/config/handleConfig");
const { permissions } = require("../utils/constants");

const getAppConfig = async (req, res) => {
  const config = getConfig();
  return res.status(200).json({
    message: "Got Config",
    config,
  });
};

const setAppConfig = async (req, res) => {
  if (!req.permissions.includes(permissions.ADMIN)) {
    throw new Error("Unauthorized for this resource");
  }
  const config = req.body.config;
  const status = await setConfig(config);
  if (!status) throw new Error("Config not updated");

  return res.status(200).json({
    message: "Successfully update the config",
  });
};

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

  // console.log(req.body);

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

const reportDetails = async (req, res) => {
  // if (!req.isAuthenticated) throw new Error("Unatuthorized");
  const { log } = req.body;
  const details = await getReportDetailsService(log);
  return res.status(200).json(details);
};

const getSinglePatientDetails = async (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  const details = await getSinglePatientDetailsService(id);
  return res.status(200).json(details);
};

module.exports = {
  getAllUsers,
  editPermissions,
  updateUser,
  generateHmsReports,
  reportDetails,
  getSinglePatientDetails,
  getAppConfig,
  setAppConfig,
};
