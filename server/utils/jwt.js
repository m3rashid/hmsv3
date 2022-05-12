import JWT from "jsonwebtoken";
import path from "path";
import fs from "fs";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keys = JSON.parse(fs.readFileSync(__dirname + "/keys/keys.json"));
console.log(keys);

export const issueJWT = (user) => {
  const expiresIn = "1d";
  const payload = {
    sub: { id: user.id, role: user.role },
    iat: Date.now(),
  };
  const signedToken = JWT.sign(payload, keys.ACCESS_SECRET, {
    expiresIn: expiresIn,
  });

  const refreshToken = JWT.sign(payload, keys.RESET_SECRET, {});

  return {
    token: signedToken,
    refreshToken: refreshToken,
    expires: expiresIn,
  };
};

export const verifyJWT = (token) => {
  try {
    const extractedToken = token.split(" ")[1];
    const decoded = JWT.verify(extractedToken, keys.ACCESS_SECRET);
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

export const revalidateJWT = (token) => {
  try {
    const extractedToken = token.split(" ")[1];
    const decoded = JWT.verify(extractedToken, keys.RESET_SECRET, {});

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
