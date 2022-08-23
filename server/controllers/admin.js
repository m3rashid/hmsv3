const { getAllUsersService, editPermissionsService } = require("../services");
const { updateUserProfileService } = require("../services/admin");

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

const updateUser = async (req, res) => {
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
    }
  );

  return res.status(200).json({
    auth,
    profile,
  });
};

module.exports = {
  getAllUsers,
  editPermissions,
  updateUser,
};
