const dayjs = require("dayjs");

const prisma = require("../utils/prisma");
const { permissions, serverActions } = require("../utils/constants");
const { quantityCalculator } = require("../utils/medecine.helpers");
const { addEventLog } = require("../utils/logs");

const getDoctorAppointmentsService = async (
  userId,
  { limit, offset, pending } = {}
) => {
  console.log({ userId });

  const appointments = await prisma.appointment.findMany({
    where: {
      doctor: { id: userId },
      ...(pending ? { pending: true } : {}),
    },
    include: { patient: true },
    orderBy: { date: "desc" },
    skip: offset || 0,
    take: limit || 500,
  });

  console.log(appointments);
  return { appointments };
};

const getDoctorPatientsService = async (doctorId) => {
  const patients = await prisma.Patient.findMany({
    where: { Appointment: { some: { doctorId: doctorId } } },
  });
  return { patients };
};

const searchDoctorsService = async ({
  name,
  minAge,
  maxAge,
  designation,
  contact,
  email,
  address,
  availability,
}) => {
  const doctors = await prisma.auth.findMany({
    where: {
      OR: [{ name: { contains: name } }, { email: { contains: email } }],
      AND: [{ permissions: { has: permissions.DOCTOR_PRESCRIBE_MEDICINE } }],
    },
    include: { profile: true },
  });
  return { count: doctors.length, doctors };
};

const createPrescriptionService = async ({
  appointment,
  symptoms,
  diagnosis,
  CustomMedicines,
  datetime,
  medicines,

  // TODO unhandled
  createdBy,
}) => {
  // hopefully works
  console.log(medicines);
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
          data: medicines.map((medicine) => {
            console.log(medicine);
            return {
              MedicineId: parseInt(medicine.medicine.id),

              duration: parseInt(medicine.duration),
              dosage: medicine.dosage,
              ...(medicine.type === "SYRUP"
                ? { quantityPerDose: parseInt(medicine.quantityPerDose) }
                : {}),
              description: medicine.description,
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
        },
      },
    },
  });

  await prisma.appointment.update({
    where: { id: appointment },
    data: { pending: false },
  });

  await addEventLog({
    action: serverActions.CREATE_PRESCRIPTION,
    fromId: createdBy,
    actionId: newPrescription.id,
    actionTable: "prescription",
  });

  return {
    prescription: newPrescription,
  };
};

const updateAppointmentService = async ({
  appointmentId,
  date,
  remarks,
  pending,

  // TODO unhandled
  createdBy,
}) => {
  const updatedAppointment = await prisma.appointment.update({
    where: { id: appointmentId },
    data: {
      ...(date ? { date } : {}),
      ...(remarks ? { remarks } : {}),
      ...(pending ? { pending } : {}),
    },
  });

  await addEventLog({
    action: serverActions.UPDATE_APPOINTMENT,
    fromId: createdBy,
    actionId: appointmentId,
    actionTable: "appointment",
  });

  return {
    appointment: updatedAppointment,
  };
};

const referAnotherDoctorAppointmentService = async ({
  patientId,
  prevDoctorId,
  nextDoctorId,
  date,
  remarks,
}) => {
  const appointment = await prisma.appointment.create({
    data: {
      date,
      remarks,
      patient: { connect: { id: patientId } },
      doctor: { connect: { id: nextDoctorId } },
      referedBy: prevDoctorId,
    },
    include: { patient: true, doctor: true },
  });

  await addEventLog({
    action: serverActions.REFER_TO_ANOTHER_DOCTOR,
    fromId: prevDoctorId,
    actionId: appointment.id,
    actionTable: "appointment",
  });

  return appointment;
};

const checkMedAvailabilityService = async ({
  medicineId,
  dosage,
  duration,
}) => {
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

module.exports = {
  searchDoctorsService,
  getDoctorPatientsService,
  updateAppointmentService,
  createPrescriptionService,
  updateAppointmentService,
  getDoctorAppointmentsService,
  referAnotherDoctorAppointmentService,
  checkMedAvailabilityService,
};
