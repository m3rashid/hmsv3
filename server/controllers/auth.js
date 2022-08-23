const {
  loginService,
  revalidateService,
  signupService,
  createDummyPatientService,
} = require("../services/auth.js");

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

const logout = (req, res) => {};

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
  });

  return res.status(200).json({
    message: "Signup Successful",
    user,
  });
};

const updateProfile = async (req, res) => {};

const revalidate = async (req, res) => {
  const refreshToken = req.headers["authorization"];
  const { user, userDetails, token, expires } = await revalidateService(
    refreshToken
  );

  return res.status(200).json({
    message: "Token revalidated",
    token,
    expires,
    user: { ...user.dataValues, [user.role]: userDetails },
  });
};

const createDummy = async (req, res) => {
  const { count } = req.body;

  for (let i = 0; i < count; i++) await createDummyPatientService();

  return res.status(200).json({
    message: "Dummy data created",
    count: count,
  });
};

module.exports = {
  login,
  signup,
  logout,
  revalidate,
  createDummy,
  updateProfile,
};
