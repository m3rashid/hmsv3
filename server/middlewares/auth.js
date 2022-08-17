const { verifyJWT } = require("../utils/jwt.js");

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) throw new Error();

    const { valid, expired, payload } = verifyJWT(token);
    if (!valid || expired) throw new Error();

    req.isAuthenticated = true;

    console.log({ jwt: payload });
    req.user = payload.sub;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const checkRouteAccess = (routeAccess) => (req, res, next) => {
  try {
    if (!routeAccess) throw new Error("Route access not defined");
    const { permissions } = req.user;
    if (!permissions.includes(routeAccess)) throw new Error();
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: err.message || "Forbidden" });
  }
};

module.exports = {
  checkAuth,
  checkRouteAccess,
};
