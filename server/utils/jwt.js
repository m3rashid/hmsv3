import JWT from "jsonwebtoken";
import path from "path";
import fs from "fs";

const privateKey = fs.readFileSync(
  path.join(__dirname, "./keys/private.pem"),
  "utf8"
);
const publicKey = fs.readFileSync(
  path.join(__dirname, "./keys/public.pem"),
  "utf8"
);

export const issueJWT = (user) => {
  const expiresIn = "1d";
  const payload = {
    sub: { id: user.id, role: user.role },
    iat: Date.now(),
  };
  const signedToken = JWT.sign(payload, privateKey, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });
  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
};

export const verifyJWT = (token) => {
  try {
    const extractedToken = token.split(" ")[1];
    const decoded = JWT.verify(extractedToken, publicKey, {
      algorithms: ["RS256"],
    });
    return {
      valid: true,
      expired: false,
      payload: decoded,
    };
  } catch (err) {
    console.log(err);
    return {
      valid: false,
      expired: err.message === "jwt expired",
      payload: null,
    };
  }
};
