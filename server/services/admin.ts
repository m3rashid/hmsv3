import bcrypt from 'bcrypt';

import { MODEL_CONSTANTS, MODEL } from 'gatekeeper';

import { ObjectId } from '../utils/types';
import { PatientModel } from '../models/patient';
import { ProfileModel } from '../models/profile';
import { AuthModel } from '../models/auth';
import { exclude, include } from '../utils/includeExclude';
import { LogModel } from '../models/log';

export const getSinglePatientDetailsService = async (id: ObjectId) => {
	if (!id) return {};
	const patientDetail = await PatientModel.findById(id);
	return exclude(patientDetail, ['isDeleted']);
};

export const getAllUsersService = async (userRole: MODEL_CONSTANTS.Role | 'PATIENT') => {
	if (!userRole) return [];
	if (userRole === 'PATIENT') {
		const users = await PatientModel.find({ isDeleted: false });
		return include(users, ['id', 'name', 'contact', 'address', 'lastVisit']);
	}

	if (!MODEL_CONSTANTS.Roles.includes(userRole)) throw new Error('Invalid user role');

	const users = await ProfileModel.find({ role: userRole }).populate('auth');
	return users;
};

export const editPermissionsService = async ({
	userId,
	permissions,

	// TODO unhandled in sockets
	doneBy,
}: {
	userId: string;
	permissions: string[];
	doneBy: MODEL.PartialUser;
}) => {
	if (!userId || !permissions) throw new Error('Invalid data');
	const user = await AuthModel.findByIdAndUpdate(userId, { permissions });

	await addEventLog({
		action: serverActions.EDIT_PERMISSIONS,
		fromId: doneBy._id,
		actionId: user._id,
		actionTable: 'auth',
		message: `${doneBy.name} <(${doneBy.email})> changed permissions to ${permissions.join(' + ')}`,
	});

	return user;
};

export const updateUserProfileService = async (
	userId: ObjectId,
	profileId: ObjectId,
	{
		name,
		email,
		password,

		sex,
		designation,
		contact,
		address,
		bio,
		availability,
		availableDays,
		roomNumber,
		authorityName,
		category,
		origin,
	}: {
		name?: string;
		email?: string;
		password?: string;
		sex?: MODEL_CONSTANTS.Sex;
		designation?: string;
		contact?: string;
		address?: string;
		bio?: string;
		availability?: any;
		availableDays?: any;
		roomNumber?: number;
		authorityName?: string;
		category?: MODEL_CONSTANTS.Category[];
		origin?: string;
	},

	// TODO unhandled in sockets
	doneBy: MODEL.PartialUser
) => {
	if (!userId || !profileId) throw new Error('Insufficient data');

	let hashedPassword = '';
	if (password && password.trim() !== '') {
		hashedPassword = await bcrypt.hash(password, 10);
	}

	const updatedAuth = await AuthModel.findByIdAndUpdate(userId, {
		...(email && email.trim() && { email: email }),
		...(hashedPassword && { password: hashedPassword }),
		...(name && name.trim() && { name: name }),
	});

	if (category?.length === 0) throw new Error('Category cannot be empty');

	const updatedProfile = await ProfileModel.findByIdAndUpdate(profileId, {
		...(sex && sex.trim() && { sex }),
		...(designation && designation.trim() && { designation }),
		...(contact && contact.trim() && { contact }),
		...(address && address.trim() && { address }),
		...(bio && bio.trim() && { bio }),
		...(availability && { availability }),
		...(availableDays && availableDays.trim() && { availableDays }),
		...(roomNumber && { roomNumber }),
		...(authorityName && authorityName.trim() && { authorityName }),
		...(category && { category }),
		...(origin && origin.trim() && { origin }),
	});

	await addEventLog({
		action: serverActions.UPDATE_PROFILE,
		fromId: doneBy._id,
		actionId: profileId,
		actionTable: 'profile',
		message: `${doneBy.name} <(${doneBy.email})> updated profile of ${updatedAuth.name}`,
	});

	return {
		auth: updatedAuth,
		profile: updatedProfile,
	};
};

export const generateReportsService = async ({ startDay, endDay, action }: any) => {
	if (action && !Object.values(serverActions).includes(action)) {
		throw new Error('Unknown action');
	}

	const reports = await LogModel.find({
		...((startDay || endDay) && {
			createdAt: {
				...(startDay && { $gte: startDay }),
				...(endDay && { $lte: endDay }),
			},
		}),
		...(action && { action }),
	}).sort({ createdAt: -1 });

	return reports;
};

export const getReportDetailsService = async (log: any) => {
	const {
		// id, action,
		fromId,
		actionId,
		actionTable,
	} = log;

	// TODO:
	// const actionDetail = await prisma[actionTable].findFirst({
	// 	where: { id: actionId },
	// });

	const doneBy = await ProfileModel.findById(fromId).populate('auth');

	return {
		// action: actionDetail,
		doneBy,
	};
};

export const viewMoreDataLogsService = async () => {};
