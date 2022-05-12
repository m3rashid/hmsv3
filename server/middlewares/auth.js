import { verifyJWT } from "../utils/jwt";

export const checkAuth = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const { valid, expired, payload } = verifyJWT(token);
  if (!valid || expired) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  req.isAuthenticated = true;
  req.user = payload.sub;
  next();
};