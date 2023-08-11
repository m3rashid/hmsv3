import { Request, Response } from 'express';

const {
	createPatientService,
	deletePatientService,
	getPatientByIdService,
	searchPatientsService,
} = require('../services');
import { permissions } from '../utils/constants';

export const createPatient = async (req: Request, res: Response) => {
	if (!req.isAuthenticated) throw new Error('Unauthorized');
	if (!req.permissions.includes(permissions.RECEPTION_CREATE_PATIENT)) {
		throw new Error('Unauthorized for this resource');
	}

	const { newPatient } = await createPatientService(...req.body, req.user);

	return res.status(200).json({
		message: 'Patient creation Successful',
		newPatient,
	});
};

export const deletePatient = async (req: Request, res: Response) => {
	await deletePatientService({
		patientId: req.params.id,
		doneBy: req.user,
	});

	return res.status(200).json({
		message: 'Patient deletion Successful',
	});
};

export const getPatientById = async (req: Request, res: Response) => {
	const { patient } = await getPatientByIdService(req.params.id);

	return res.status(200).json({
		message: 'Patient found',
		patient,
	});
};

export const searchPatients = async (req: Request, res: Response) => {
	const { count, patients } = await searchPatientsService(req.query);

	return res.status(200).json({
		message: `${count} patients found`,
		patients,
	});
};
