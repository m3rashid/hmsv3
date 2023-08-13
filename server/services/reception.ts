
export const createAppointmentService = async ({ patientId, doctorId, date, remarks, doneBy }: any) => {
  const newAppointment = await prisma.appointment.create({
    data: {
      date,
      remarks,
      patient: { connect: { id: patientId } },
      doctor: { connect: { id: doctorId } },
    },
    include: { patient: true, doctor: true },
  });

  const getDoctor = await prisma.auth.findFirst({
    where: { id: doctorId },
  });

  await addEventLog({
    action: serverActions.CREATE_APPOINTMENT,
    fromId: doneBy.id,
    actionId: newAppointment.id,
    actionTable: 'appointment',
    message: `${doneBy.name} <(${doneBy.email})> created appointment for ${newAppointment.patient.name} with doctor ${getDoctor.name}`,
  });

  return newAppointment;
};

export const getAppointmentByIdService = async (appointmentId: string) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
    include: { patient: true, doctor: true },
  });

  return {
    Appointment: appointment,
    id: appointment?.id,
  };
};

export const getAllAppointmentsService = async () => {
  const appointments = await prisma.appointment.findMany({
    include: {
      patient: true,
      doctor: {
        include: {
          Auth: {
            select: { email: true, name: true },
          },
        },
      },
    },
  });

  return appointments;
};
