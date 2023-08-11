export const checkAccess = (routeAccess: string[], permissions: string[]) => {
	if (!routeAccess) return false;
	const contains = routeAccess.some((role) => permissions.includes(role));
	return contains;
};
