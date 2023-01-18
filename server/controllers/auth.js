const {
  loginService,
  revalidateService,
  signupService,
} = require("../services");

const login = async (req, res) => {
  const { user, token, refreshToken, expires, userDetails } =
    await loginService(req.body.email, req.body.password);

  return res.status(200).json({
    message: "Login Successful",
    token,
    refreshToken,
    expires,
    user: {
      ...user.dataValues,
      userDetails: userDetails,
    },
  });
};

const signup = async (req, res) => {
  const user = await signupService({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    role: req.body.role,
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

    doneBy: req.user,
  });

  return res.status(200).json({
    message: "Signup Successful",
    user,
  });
};

const revalidate = async (req, res) => {
  const refreshToken = req.headers["authorization"];
  const { user, userDetails, token, expires } = await revalidateService(
    refreshToken
  );
  console.log("userRole: ", user.role);
  return res.status(200).json({
    message: "Token revalidated",
    token,
    expires,
    user: { ...user.dataValues, profile: userDetails },
  });
};

module.exports = {
  login,
  signup,
  revalidate,
};
