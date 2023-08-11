import bcrypt from 'bcrypt';

import { Sex, Category, Role } from '../models/base';
import { ObjectId, PartialUser } from '../utils/types';

const { prisma } = require('../utils/prisma');
const { addEventLog } = require('../utils/logs');
const { supportedUserRoles, serverActions } = require('../utils/constants');
const { exclude, include } = require('../utils/includeExclude');

export const getSinglePatientDetailsService = async (id: ObjectId) => {
	if (!id) return {};
	const patientDetail = await prisma.patient.findUnique({
		where: { id },
	});

	return exclude(patientDetail, ['isDeleted']);
};

export const getAllUsersService = async (userRole: Role | 'PATIENT') => {
	if (!userRole) return [];
	if (userRole === 'PATIENT') {
		const users = await prisma.patient.findMany({
			where: { isDeleted: false },
		});

		return include(users, ['id', 'name', 'contact', 'address', 'lastVisit']);
	}

	if (!supportedUserRoles.includes(userRole)) {
		throw new Error('Invalid user role');
	}

	const users = await prisma.profile.findMany({
		where: { role: userRole },
		include: { Auth: true },
	});

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
	doneBy: PartialUser;
}) => {
	if (!userId || !permissions) throw new Error('Invalid data');
	const user = await prisma.auth.update({
		where: { id: userId },
		data: { permissions },
	});

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
		sex?: Sex;
		designation?: string;
		contact?: string;
		address?: string;
		bio?: string;
		availability?: any;
		availableDays?: any;
		roomNumber?: number;
		authorityName?: string;
		category?: Category[];
		origin?: string;
	},

	// TODO unhandled in sockets
	doneBy: PartialUser
) => {
	if (!userId || !profileId) throw new Error('Insufficient data');

	let hashedPassword = '';
	if (password && password.trim() !== '') {
		hashedPassword = await bcrypt.hash(password, 10);
	}

	const updatedAuth = await prisma.auth.update({
		where: { id: userId },
		data: {
			...(email && email.trim() && { email: email }),
			...(hashedPassword && { password: hashedPassword }),
			...(name && name.trim() && { name: name }),
		},
	});

	if (category?.length === 0) throw new Error('Category cannot be empty');

	const updatedProfile = await prisma.Profile.update({
		where: { id: profileId },
		data: {
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
		},
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

export const generateReportsService = async ({ startDay, endDay, action }) => {
	if (action && !Object.values(serverActions).includes(action)) {
		throw new Error('Unknown action');
	}

	const reports = await prisma.log.findMany({
		where: {
			AND: [
				{
					...((startDay || endDay) && {
						createdAt: {
							...(startDay && { gte: startDay }),
							...(endDay && { lte: endDay }),
						},
					}),
				},
				{ ...(action && { action }) },
			],
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return reports;
};

export const getReportDetailsService = async (log) => {
	const {
		// id, action,
		fromId,
		actionId,
		actionTable,
	} = log;

	const actionDetail = await prisma[actionTable].findFirst({
		where: { id: actionId },
	});

	const doneBy = await prisma.profile.findFirst({
		where: { id: fromId },
		include: {
			Auth: {
				select: {
					email: true,
					name: true,
				},
			},
		},
	});

	return {
		action: actionDetail,
		doneBy,
	};
};

export const viewMoreDataLogsService = async () => {};
