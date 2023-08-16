import { MODEL } from 'gatekeeper';
import { AppointmentModel } from '../models/appointment';
import { AuthModel } from '../models/auth';
import { PatientModel } from '../models/patient';
import { PrescriptionModel } from '../models/prescription';
import { quantityCalculator } from '../utils/medicine.helpers';
import { ObjectId } from '../utils/types';
import dayjs from 'dayjs';
import { MedicineModel } from '../models/medicine';

export const getDoctorAppointmentsService = async (
	userId: string,
	{ limit, offset, pending }: { limit?: number; offset?: number; pending?: boolean }
) => {
	const appointments = await AppointmentModel.find({
		doctor: userId,
		...(pending ? { pending: true } : {}),
	})
		.populate('patient')
		.sort({ date: 'desc' })
		.skip(offset ?? 0)
		.limit(limit ?? 500);

	return { appointments };
};

export const getDoctorPatientsService = async (doctorId: string) => {
	// const patients = await prisma.Patient.findMany({
	// 	where: { Appointment: { some: { doctorId: doctorId } } },
	// });
	const patients = await PatientModel.find({});
	return { patients };
};

export const searchDoctorsService = async ({
	name,
	minAge,
	maxAge,
	designation,
	contact,
	email,
	address,
	availability,
	time,
}: any) => {
	const doctors = await AuthModel.find({
		$or: [{ name: { $regex: name, $options: 'i' } }, { email: { $regex: email, $options: 'i' } }],
		permissions: { $in: ['DOCTOR_PRESCRIBE_MEDICINE'] },
	}).populate('profile');

	// const { hour, minute, day } = JSON.parse(time);
	// console.log(doctors);
	// const curr = parseFloat(`${hour}.${minute}`);
	// const filteredDoctors = doctors.filter((doctor) => {
	//   console.log(hour, minute, DayjsArr[day], time);

	//   const availableDay = doctor.profile.availability.find(
	//     (avail) => avail.day === DayjsArr[day]
	//   );

	//   if (!availableDay) return false;

	//   const availableTime = availableDay.range.some((range) => {
	//     const start = parseFloat(`${range?.from?.hour}.${range?.from?.minute}`);
	//     const end = parseFloat(`${range?.to?.hour}.${range?.to?.minute}`);
	//     console.log(start, end);
	//     return curr >= start && curr <= end;
	//   });

	//   return availableTime;
	// });

	return { count: doctors.length, doctors: doctors };
};

interface ICreatePrescriptionService {
	appointment: ObjectId;
	symptoms: any;
	diagnosis: any;
	CustomMedicines: any;
	datetime: Date;
	medicines: any;
	doneBy: MODEL.PartialUser;
}
export const createPrescriptionService = async ({
	appointment,
	symptoms,
	diagnosis,
	CustomMedicines,
	datetime,
	medicines,
	doneBy,
}: ICreatePrescriptionService) => {
	const newPrescription = new PrescriptionModel({
		appointment: appointment,
		symptoms,
		CustomMedicines,
		datetime: dayjs(datetime).toDate(),
		medicines: medicines.map((m: any) => ({
			MedicineId: parseInt(m.Medicine.id),

			duration: parseInt(m.duration),
			dosage: m.dosage,
			...(m.type === 'SYRUP' ? { quantityPerDose: parseInt(m.quantityPerDose) } : {}),
			description: m.description || '',
		})),
	});

	await AppointmentModel.findByIdAndUpdate(appointment, { pending: false });
	const prescription = await AppointmentModel.findById(newPrescription._id)
		.populate('doctor')
		.populate('patient');

	await addEventLog({
		action: serverActions.CREATE_PRESCRIPTION,
		fromId: doneBy._id,
		actionId: newPrescription.id,
		actionTable: 'prescription',
		message: `${doneBy.name} <(${doneBy.email})> created prescription for ${prescription.patient.name} as doctor ${prescription.doctor.name}`,
	});

	return {
		prescription: newPrescription,
	};
};

export const updateAppointmentService = async ({
	appointmentId,
	date,
	remarks,
	pending,

	// TODO unhandled in sockets
	doneBy,
}: any) => {
	const updatedAppointment = await AppointmentModel.findByIdAndUpdate(appointmentId, {
		...(date ? { date } : {}),
		...(remarks ? { remarks } : {}),
		...(pending ? { pending } : {}),
	});
	const prescription = await AppointmentModel.findById(updatedAppointment._id)
		.populate('doctor')
		.populate('patient');

	await addEventLog({
		action: serverActions.UPDATE_APPOINTMENT,
		fromId: doneBy.id,
		actionId: appointmentId,
		actionTable: 'appointment',
		message: `${doneBy.name} <(${doneBy.email})> updated prescription for ${prescription.patient.name} with doctor ${prescription.doctor.name}`,
	});

	return {
		appointment: updatedAppointment,
	};
};

export const referAnotherDoctorAppointmentService = async ({
	patientId,
	prevDoctorId,
	nextDoctorId,
	date,
	remarks,
	doneBy,
}: any) => {
	const appointment = new AppointmentModel({
		date,
		remarks,
		patient:  patientId,
		doctor:  nextDoctorId,
		referredDoc: prevDoctorId
	});

	await addEventLog({
		action: serverActions.REFER_TO_ANOTHER_DOCTOR,
		fromId: prevDoctorId,
		actionId: appointment.id,
		actionTable: 'appointment',
		message: `${doneBy.name} <(${doneBy.email})> referred ${appointment.patient.name} to ${appointment.doctor.name}`,
	});

	return appointment;
};

export const checkMedAvailabilityService = async ({ medicineId, dosage, duration }: any) => {
	const medicine = await MedicineModel.findById(medicineId)
	const quantityRequired = quantityCalculator(duration, dosage);

	if (medicine.quantity >= quantityRequired) {
		return {
			available: true,
			medicine,
			quantityRequired,
		};
	} else {
		return {
			available: false,
			medicine,
			quantityRequired,
		};
	}
};

export const getPrescriptionByAppointmentService = async ({ id }: { id: string }) => {
	const data = await PrescriptionModel.findOne({ appointmentId: id })
		.populate('medicines')
		.populate('medicines.medicine')
		.populate('appointment')
		.populate('appointment.doctor')
		.populate('appointment.patient')

	return data;
};

export const createDoctorLeaveService = async ({ doctorId, start, end, reason, doneBy }: any) => {
	// const leave = await prisma.profile.create({
	// 	where: {
	// 		id: doctorId,
	// 	},
	// 	data: {
	// 		leave: {
	// 			create: {
	// 				start,
	// 				end,
	// 				reason,
	// 			},
	// 		},
	// 	},
	// });


	// await addEventLog({
	// 	action: serverActions.CREATE_DOCTOR_LEAVE,
	// 	fromId: doneBy.id,
	// 	actionId: leave.id,
	// 	actionTable: 'doctorLeave',
	// 	message: `${doneBy.name} <(${doneBy.email})> created leave for doctor ${leave.doctor.name}`,
	// });

	// return leave;
	return
};
