import { Request, Response } from "express";

const {
  dispensePrescriptionService,
  getAllPrescriptionsService,
  getPrescriptionByIdService,
} = require('../services');
const { permissions } = require('../utils/constants');

export const getAllPrescriptions = async (req: Request, res: Response) => {
	if (!req.isAuthenticated) throw new Error('Unauthorized');
	if (!req.permissions.includes(permissions.PHARMACY_PRESCRIPTIONS)) {
		throw new Error('Unauthorized for this resource');
	}

	const { prescriptions } = await getAllPrescriptionsService(req.query);

	return res.status(200).json({
		prescriptions,
	});
};

export const getPrescriptionById = async (req: Request, res: Response) => {
	if (!req.isAuthenticated) throw new Error('Unauthorized');
	if (!req.permissions.includes(permissions.PHARMACY_PRESCRIPTIONS)) {
		throw new Error('Unauthorized for this resource');
	}

	const { prescription } = await getPrescriptionByIdService(parseInt(req.params.id));
	return res.status(200).json({
		prescription,
	});
};

export const dispensePrescription = async (req: Request, res: Response) => {
	if (!req.user || !req.user.id) throw new Error('Unauthorized');

	const { receipt } = await dispensePrescriptionService({
		...req.body,
		doneBy: req.user,
	});
	return res.status(200).json({
		receipt,
	});
};
