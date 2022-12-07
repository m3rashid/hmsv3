const PORT = process.env.PORT || 5000;

const HOST = process.env.SERVER_HOST || "localhost";

const isProduction = process.env.NODE_ENV === "production";

const corsOrigin = isProduction ? "*" : "*";

module.exports = {
  PORT,
  HOST,
  isProduction,
  corsOrigin,
};
