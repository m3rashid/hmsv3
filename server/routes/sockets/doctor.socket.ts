import {
	getPatientByIdService,
  getDoctorPatientsService,
  createPrescriptionService,
  getDoctorAppointmentsService,
} from '../../services';
import { IO, Socket } from '../../utils/types';
import { socketConstants } from '../../utils/constants';
import { createDoctorLeaveService } from '../../services/doctor';

export const getDoctorAppointments =
	(io: IO, socket: Socket) =>
	async ({ doctorId }: { doctorId: string }) => {
		const { appointments } = await getDoctorAppointmentsService(doctorId);
		io.emit('found-doctor-appointments', {
			doctorId,
			appointments,
		});
	};

export const getDoctorPatients =
	(io: IO, socket: Socket) =>
	async ({ doctorId }: { doctorId: string }) => {
		const { patients } = await getDoctorPatientsService(doctorId);
		io.emit('found-doctor-patients', {
			doctorId,
			patients,
		});
	};

export const getPatientById =
	(io: IO, socket: Socket) =>
	async ({ patientId }: { patientId: string }) => {
		const { patient } = await getPatientByIdService(patientId);
		io.emit('patient-found', {
			patientId,
			patient,
		});
	};

export const doctorLeft = (io: IO, socket: Socket) => async () => {
	io.emit('doctor-left', { doctorId: socket.data.user });
};

export const createPrescriptionByDoctor =
	(io: IO, socket: Socket) =>
	async ({ appointment, symptoms, diagnosis, CustomMedicines, datetime, medicines }: any) => {
		const data = await createPrescriptionService({
			appointment,
			symptoms,
			diagnosis,
			CustomMedicines,
			datetime,
			medicines,
			doneBy: socket.data.user,
		});

		// console.log(data);

		io.emit(socketConstants.createPrescriptionByDoctor, { data });
	};

export const referAnotherDoctor =
	(io: IO, socket: Socket) =>
	async ({ patientId, prevDoctorId, nextDoctorId, date, remarks }: any) => {
		const appointment = await referAnotherDoctorAppointmentService({
			patientId,
			prevDoctorId,
			nextDoctorId,
			date,
			remarks,
			doneBy: socket.data.user,
		});

		io.emit(socketConstants.referAnotherDoctor, { appointment });
	};

export const makeLeaveRequest =
	(io: IO, socket: Socket) =>
	async ({ doctorId, date, reason }: any) => {
		const leaveRequest = await createDoctorLeaveService({
			doctorId,
			date,
			reason,
			doneBy: socket.data.user,
		});
		io.emit(socketConstants.doctorLeft, { leaveRequest });
	};
