const useRoute = (check) => (req, res, next) => {
  Promise.resolve(check(req, res, next)).catch(next);
};

module.exports = {
  useRoute,
};
