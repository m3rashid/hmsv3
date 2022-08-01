const JWT = require("jsonwebtoken");
const fs = require("fs");

const keys = JSON.parse(fs.readFileSync(__dirname + "/keys/keys.json"));
console.log(keys);

const issueJWT = (user) => {
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

const verifyJWT = (token) => {
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

const revalidateJWT = (token) => {
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

module.exports = {
  issueJWT,
  verifyJWT,
  revalidateJWT,
};
