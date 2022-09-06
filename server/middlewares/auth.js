const { verifyJWT } = require("../utils/jwt.js");

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) throw new Error("No token");

    const { valid, expired, payload } = verifyJWT(token);
    if (!valid || expired) throw new Error("Valid or expired");

    req.user = payload.sub;
    req.isAuthenticated = true;
    req.permissions = payload.sub.permissions;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = {
  checkAuth,
};
