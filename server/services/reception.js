const prisma = require("../utils/prisma");

const createAppointmentService = async ({
  patientId,
  doctorId,
  patient,
  doctor,
  date,
  remarks,
}) => {
  try {
    // console.log("New Appointment : ", patientId, doctorId, date);
    const newAppointment = await prisma.appointment.create({
      data: {
        date,
        remarks,
        patient: {
          connect: {
            id: patientId,
          },
        },
        doctor: {
          connect: {
            id: doctorId,
          },
        },
      },
      include: { patient: true, doctor: true },
    });

    return newAppointment;
  } catch (err) {
    console.log(err);
    return new Error("Internal Server Error");
  }
};

const getAppointmentByIdService = async (appointmentId) => {
  try {
    const appointment = await prisma.Appointment.findUnique({
      where: { id: appointmentId },
      include: { patient: true, doctor: true },
    });

    console.log(appointment);

    return {
      Appointment: appointment,
      id: appointment?.id,
    };
  } catch (err) {
    console.log(err);
    return new Error("Internal Server Error");
  }
};

module.exports = {
  createAppointmentService,
  getAppointmentByIdService,
};
