import { Request, Response } from "express";

const { loginService, revalidateService, signupService } = require('../services');

export const login = async (req: Request, res: Response) => {
	const { user, token, refreshToken, expires, userDetails } = await loginService(
		req.body.email,
		req.body.password
	);

	return res.status(200).json({
		message: 'Login Successful',
		token,
		refreshToken,
		expires,
		user: {
			...user.dataValues,
			userDetails: userDetails,
		},
	});
};

export const signup = async (req: Request, res: Response) => {
	const user = await signupService({
		email: req.body.email,
		password: req.body.password,
		name: req.body.name,
		role: req.body.role,
		sex: req.body.sex,
		roomNumber: req.body.roomNumber,

		designation: req.body.designation,
		contact: req.body.contact,
		address: req.body.address,
		bio: req.body.bio,
		availability: req.body.availability,
		availableDays: req.body.availableDays,
		authorityName: req.body.authorityName,
		category: req.body.category,
		origin: req.body.origin,

		doneBy: req.user,
	});

	return res.status(200).json({
		message: 'Signup Successful',
		user,
	});
};

export const revalidate = async (req: Request, res: Response) => {
	const refreshToken = req.headers['authorization'];
	const { user, userDetails, token, expires } = await revalidateService(refreshToken);
	return res.status(200).json({
		message: 'Token revalidated',
		token,
		expires,
		user: { ...user.dataValues, profile: userDetails },
	});
};
