const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  isProduction,
  PORT: process.env.PORT || 5000,
  HOST: process.env.SERVER_HOST || "localhost",
  corsOrigin: isProduction ? "*" : "*",
};
