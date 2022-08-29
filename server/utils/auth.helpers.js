const checkAccess = (routeAccess, permissions) => {
  if (!routeAccess) return false;
  const contains = routeAccess.some((role) => permissions.includes(role));
  return contains;
};

module.exports = {
  checkAccess,
};
