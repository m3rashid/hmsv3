const {
  getAllUsersService,
  editPermissionsService,
} = require("../services/admin");

const getAllUsers = async (req, res) => {
  const users = await getAllUsersService(req.body.userRole);

  return res.status(200).json({
    message: "Got users",
    users,
  });
};

const editPermissions = async (req, res) => {
  const users = await editPermissionsService(
    req.body.userId,
    req.body.permissions
  );

  return res.status(200).json({
    message: "Got users",
    users,
  });
};

module.exports = {
  getAllUsers,
  editPermissions,
};
