import { AppointmentModel } from '../models/appointment';
import { AuthModel } from '../models/auth';
import { quantityCalculator } from '../utils/medecine.helpers';

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
	const patients = await prisma.Patient.findMany({
		where: { Appointment: { some: { doctorId: doctorId } } },
	});
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

export const createPrescriptionService = async ({
	appointment,
	symptoms,
	diagnosis,
	CustomMedicines,
	datetime,
	medicines,
	doneBy,
}: any) => {
	const newPrescription = await prisma.prescription.create({
		data: {
			appointment: {
				connect: { id: appointment },
			},
			symptoms,
			CustomMedicines,
			datePrescribed: dayjs(datetime).toDate(),
			medicines: {
				createMany: {
					data: medicines.map((medicine: any) => {
						return {
							MedicineId: parseInt(medicine.Medicine.id),

							duration: parseInt(medicine.duration),
							dosage: medicine.dosage,
							...(medicine.type === 'SYRUP'
								? { quantityPerDose: parseInt(medicine.quantityPerDose) }
								: {}),
							description: medicine.description || '',
						};
					}),
				},
			},
		},
		include: {
			appointment: {
				select: {
					patient: { select: { name: true, contact: true } },
					doctor: {
						select: {
							Auth: { select: { name: true } },
							designation: true,
						},
					},
					// appointment,
				},
			},
		},
	});

	await prisma.appointment.update({
		where: { id: appointment },
		data: { pending: false },
	});

	const prescription = await prisma.appointment.findFirst({
		where: { id: newPrescription.id },
		include: { doctor: true, patient: true },
	});

	await addEventLog({
		action: serverActions.CREATE_PRESCRIPTION,
		fromId: doneBy.id,
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
	const updatedAppointment = await prisma.appointment.update({
		where: { id: appointmentId },
		data: {
			...(date ? { date } : {}),
			...(remarks ? { remarks } : {}),
			...(pending ? { pending } : {}),
		},
		include: {
			appointment: {
				select: {
					patient: { select: { name: true, contact: true } },
					doctor: {
						select: {
							Auth: { select: { name: true } },
							designation: true,
						},
					},
				},
			},
		},
	});

	const prescription = await prisma.appointment.findFirst({
		where: { id: updatedAppointment.id },
		include: { doctor: true, patient: true },
	});

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
	const appointment = await prisma.appointment.create({
		data: {
			date,
			remarks,
			patient: {
				connect: { id: patientId },
			},
			doctor: {
				connect: { id: nextDoctorId },
			},
			referredDoc: {
				connect: { id: prevDoctorId },
			},
		},
		include: { patient: true, doctor: true },
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
	const medicine = await prisma.medicine.findFirst({
		where: { id: medicineId },
	});
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

export const getPrescriptionByAppointmentService = async ({ id }: {id: string}) => {
	const data = await prisma.prescription.findFirst({
		where: {
			appointmentId: id,
		},
		include: {
			medicines: {
				include: {
					Medicine: true,
				},
			},
			appointment: {
				include: {
					doctor: true,
					patient: true,
				},
			},
		},
	});

	return data;
};

export const createDoctorLeaveService = async ({ doctorId, start, end, reason, doneBy }: any) => {
	const leave = await prisma.profile.create({
		where: {
			id: doctorId,
		},
		data: {
			leave: {
				create: {
					start,
					end,
					reason,
				},
			},
		},
	});

	await addEventLog({
		action: serverActions.CREATE_DOCTOR_LEAVE,
		fromId: doneBy.id,
		actionId: leave.id,
		actionTable: 'doctorLeave',
		message: `${doneBy.name} <(${doneBy.email})> created leave for doctor ${leave.doctor.name}`,
	});

	return leave;
};
