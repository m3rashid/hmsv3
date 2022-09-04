const { serverActions } = require("../utils/constants");
const { addEventLog } = require("../utils/logs");
const prisma = require("../utils/prisma");

const createAppointmentService = async ({
  patientId,
  doctorId,
  date,
  remarks,
  createdBy,
}) => {
  const newAppointment = await prisma.appointment.create({
    data: {
      date,
      remarks,
      patient: { connect: { id: patientId } },
      doctor: { connect: { id: doctorId } },
    },
    include: { patient: true, doctor: true },
  });

  await addEventLog({
    action: serverActions.CREATE_APPOINTMENT,
    fromId: createdBy,
    actionId: newAppointment.id,
    actionTable: "appointment",
  });

  return newAppointment;
};

const getAppointmentByIdService = async (appointmentId) => {
  const appointment = await prisma.Appointment.findUnique({
    where: { id: appointmentId },
    include: { patient: true, doctor: true },
  });

  return {
    Appointment: appointment,
    id: appointment?.id,
  };
};

module.exports = {
  createAppointmentService,
  getAppointmentByIdService,
};
