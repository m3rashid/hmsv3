const { isProduction } = require("../utils/config");

const globalErrorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  return res.status(500).json({
    message: !isProduction
      ? JSON.stringify(err.message) || "Internal Server Error"
      : "Internal Server Error",
  });
};

module.exports = {
  globalErrorHandlerMiddleware,
};
