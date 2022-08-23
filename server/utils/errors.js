const { isProduction } = require("./config");

const globalErrorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  return res.status(500).json({
    message: isProduction
      ? JSON.stringify(err.message) || "Internal Server Error"
      : "Internal Server Error",
  });
};

const useRoute = (check) => (req, res, next) => {
  Promise.resolve(check(req, res, next)).catch(next);
};

module.exports = {
  useRoute,
  globalErrorHandlerMiddleware,
};
