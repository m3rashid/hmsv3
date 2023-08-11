import { Request, Response } from "express";

const { makeLeaveRequest } = require('../routes/sockets/doctor.socket');
const {
  getDoctorAppointmentsService,
  getDoctorPatientsService,
  searchDoctorsService,
  createPrescriptionService,
  referAnotherDoctorAppointmentService,
  checkMedAvailabilityService,
  getAppointmentByIdService,
  getPrescriptionByAppointmentService,
} = require('../services');
import { permissions } from '../utils/constants';

export const getDoctorAppointments = async (req: Request, res: Response) => {
	if (!req.isAuthenticated) throw new Error('Unauthorized');
	if (!req.permissions.includes(permissions.DOCTOR_APPOINTMENTS)) {
		throw new Error('Unauthorized for this resource');
	}

	const { appointments } = await getDoctorAppointmentsService(req.user.id);

	return res.status(200).json({
		appointments,
	});
};

export const getAppointmentById = async (req: Request, res: Response) => {
	if (!req.isAuthenticated) throw new Error('Unauthorized');
	if (!req.permissions.includes(permissions.DOCTOR_APPOINTMENTS)) {
		throw new Error('Unauthorized for this resource');
	}

	const data = await getAppointmentByIdService(req.query.id);
	return res.status(200).json(data);
};

export const getDoctorPatients = async (req: Request, res: Response) => {
	if (!req.isAuthenticated) throw new Error('Unauthorized');

	const { patients } = await getDoctorPatientsService(req.user.id);
	return res.status(200).json({
		patients,
	});
};

export const searchDoctors = async (req: Request, res: Response) => {
	const { count, doctors } = await searchDoctorsService(req.query);

	return res.status(200).json({
		message: `${count} doctors found`,
		doctors,
	});
};

export const createPrescriptionByDoctor = async (req: Request, res: Response) => {
	if (!req.isAuthenticated) throw new Error('Unauthorized');
	if (!req.permissions.includes(permissions.DOCTOR_PRESCRIBE_MEDICINE)) {
		throw new Error('Unauthorized for this resource');
	}

	const { appointment, symptoms, diagnosis, customMedicines, datetime, medicines } = req.body;

	const { prescription: newPrescription } = await createPrescriptionService({
		appointment,
		symptoms,
		diagnosis,
		customMedicines,
		datetime,
		medicines,
		doneBy: req.user,
	});

	return res.status(200).json({
		newPrescription,
	});
};

export const referAnotherDoctor = async (req: Request, res: Response) => {
	if (!req.isAuthenticated) throw new Error('Unauthorized');
	if (!req.permissions.includes(permissions.DOCTOR_PRESCRIBE_MEDICINE)) {
		throw new Error('Unauthorized for this resource');
	}

	const appointment = await referAnotherDoctorAppointmentService({
		patientId: req.body.patientId,
		prevDoctorId: req.body.prevDoctorId,
		nextDoctorId: req.body.nextDoctorId,
		date: req.body.date,
		remarks: req.body.remarks,
		doneBy: req.user,
	});

	return res.status(200).json({
		appointment,
	});
};

export const checkMedAvailability = async (req: Request, res: Response) => {
	const { dosage, medicineId, duration } = req.body;

	const data = await checkMedAvailabilityService({
		dosage,
		medicineId,
		duration,
	});

	return res.status(200).json(data);
};

export const GetPrescriptionByAppointmentID = async (req: Request, res: Response) => {
	const { id } = req.query;

	// console.log(req.query);

	const data = await getPrescriptionByAppointmentService({
		id,
	});

	return res.status(200).json(data);
};

export const makeDoctorLeave = async (req: Request, res: Response) => {
	if (!req.isAuthenticated) throw new Error('Unauthorized');

	const date = new Date();
	const { doctorId, reason } = req.body;

	const data = await makeLeaveRequest(doctorId, reason, date, req.user);

	return res.status(200).json(data);
};
