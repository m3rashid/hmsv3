const {
  getAllUsersService,
  editPermissionsService,
} = require("../services/admin");

const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService(req.body.userRole);
    return res.status(200).json({
      message: "Got users",
      users,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message || "No data",
      users: [],
    });
  }
};

const editPermissions = async (req, res) => {
  try {
    const users = await editPermissionsService(
      req.body.userId,
      req.body.permissions
    );
    return res.status(200).json({
      message: "Got users",
      users,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message || "No data",
      users: [],
    });
  }
};

module.exports = {
  getAllUsers,
  editPermissions,
};
