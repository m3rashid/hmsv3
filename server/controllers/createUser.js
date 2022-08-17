const {
  createUserService,
  createProfileService,
} = require("../services/createUser.js");

const createProfile = async (req, res) => {
  try {
    const profile = await createProfileService(
      req.body.userId,
      req.body.designation,
      req.body.contact,
      req.body.address,
      req.body.bio,
      req.body.sex,
      req.body.availability,
      req.body.availableDays,
      req.body.roomNumber,
      req.body.authorityName,
      req.body.category,
      req.body.origin
    );
    return res.status(200).json({
      message: "User creation Successful",
      user: profile,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message || "Internal Server Error",
      error: err,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { user } = await createUserService(
      req.body.email,
      req.body.password,
      req.body.role,
      req.body.name
    );
    return res.status(200).json({
      message: "User creation Successful",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message || "Internal Server Error",
      error: err,
    });
  }
};

module.exports = {
  createUser,
  createProfile,
};
