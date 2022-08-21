const checkAccess = (routeAccess, permissions) => {
  console.log({ routeAccess, permissions });
  if (!routeAccess) return false;
  const contains = routeAccess.some((role) => permissions.includes(role));
  console.log({ contains });
  return contains;
};

module.exports = {
  checkAccess,
};
