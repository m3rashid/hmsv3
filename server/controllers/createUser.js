const { createProfileService } = require("../services/createUser.js");

const createProfile = async (req, res) => {
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
};

module.exports = {
  createProfile,
};
