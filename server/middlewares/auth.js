const { verifyJWT } = require("../utils/jwt.js");

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) throw new Error();

    const { valid, expired, payload } = verifyJWT(token);
    if (!valid || expired) throw new Error();

    req.isAuthenticated = true;

    // console.log({ jwt: payload });
    req.user = payload.sub;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
  checkAuth,
};
