const prisma = require("../utils/prisma");

const createAppointmentService = async ({
  patientId,
  doctorId,
  date,
  remarks,
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
  return newAppointment;
};

const getAppointmentByIdService = async (appointmentId) => {
  const appointment = await prisma.Appointment.findUnique({
    where: { id: appointmentId },
    include: { patient: true, doctor: true },
  });

  console.log(appointment);

  return {
    Appointment: appointment,
    id: appointment?.id,
  };
};

module.exports = {
  createAppointmentService,
  getAppointmentByIdService,
};
