const {
  getAllUsersService,
  editPermissionsService,
  generateReportsService,
  updateUserProfileService,
  getReportDetailsService,
  getSinglePatientDetailsService,
} = require('../services');
import { Request, Response } from 'express';
import { getConfig, setConfig, resetConfig } from '../services/config/handleConfig';
import { permissions } from '../utils/constants';

export const getAppConfig = async (req: Request, res: Response) => {
	const config = getConfig();
	return res.status(200).json({ message: 'Got Config', config });
};

export const resetAppConfig = async (req: Request, res: Response) => {
	if (!req.permissions.includes(permissions.ADMIN)) {
		console.log('not permitted');
		throw new Error('Unauthorized for this resource');
	}

	const { status, config } = await resetConfig({ doneBy: req.user });
	if (!status) throw new Error('Config not updated');

	return res.status(200).json({
		message: 'Successfully update the config',
		config,
	});
};

export const setAppConfig = async (req: Request, res: Response) => {
	if (!req.permissions.includes(permissions.ADMIN)) {
		throw new Error('Unauthorized for this resource');
	}
	const { config, change } = req.body;
	const { status, config: newUpdatedConfig } = await setConfig({
		config,
		change,
		doneBy: req.user,
	});
	if (!status) throw new Error('Config not updated');

	return res.status(200).json({
		message: 'Successfully update the config',
		config: newUpdatedConfig,
	});
};

export const getAllUsers = async (req: Request, res: Response) => {
	if (
		!req.permissions.includes(permissions.ADMIN) &&
		!req.permissions.includes(permissions.GET_ALL_USERS)
	) {
		throw new Error('Unauthorized for this resource');
	}

	const users = await getAllUsersService(req.body.userRole);

	return res.status(200).json({
		message: 'Got users',
		users,
	});
};

export const editPermissions = async (req: Request, res: Response) => {
	if (
		!req.permissions.includes(permissions.ADMIN) &&
		!req.permissions.includes(permissions.EDIT_USER_PERMISSIONS)
	) {
		throw new Error('Unauthorized for this resource');
	}

	const users = await editPermissionsService({
		userId: req.body.userId,
		permissions: req.body.permissions,
		doneBy: req.user,
	});

	return res.status(200).json({
		message: 'Got users',
		users,
	});
};

export const updateUser = async (req: Request, res: Response) => {
	if (
		!req.permissions.includes(permissions.ADMIN) &&
		!req.permissions.includes(permissions.EDIT_USER_PROFILE)
	) {
		throw new Error('Unauthorized for this resource');
	}

	// console.log(req.body);

	const { auth, profile } = await updateUserProfileService(
		req.body.userId,
		req.body.profileId,
		{
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,

			sex: req.body.sex,
			designation: req.body.designation,
			contact: req.body.contact,
			address: req.body.address,
			bio: req.body.bio,
			availability: req.body.availability,
			availableDays: req.body.availableDays,
			roomNumber: req.body.roomNumber,
			authorityName: req.body.authorityName,
			category: req.body.category,
			origin: req.body.origin,
		},
		req.user
	);

	return res.status(200).json({
		auth,
		profile,
	});
};

export const generateHmsReports = async (req: Request, res: Response) => {
	// if (!req.permissions.includes(permissions.ADMIN)) {
	//   throw new Error("Unauthorized for this resource");
	// }

	const reports = await generateReportsService({
		startDay: req.body.startDay,
		endDay: req.body.endDay,
		action: req.body.action,
	});

	return res.status(200).json(reports);
};

export const reportDetails = async (req: Request, res: Response) => {
	// if (!req.isAuthenticated) throw new Error("Unauthorized");
	const { log } = req.body;
	const details = await getReportDetailsService(log);
	return res.status(200).json(details);
};

export const getSinglePatientDetails = async (req: Request, res: Response) => {
  const { id } = req.body;
  const details = await getSinglePatientDetailsService(id);
  return res.status(200).json(details);
};
