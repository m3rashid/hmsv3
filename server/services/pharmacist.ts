import dayjs from "dayjs"

import { addEventLog } from "../utils/logs";

export const getAllPrescriptionsService = async ({ limit, from, to, offset }: any) => {
  const prescriptions = await prisma.prescription.findMany({
    where: {
      datePrescribed: {
        gte: from ? dayjs(from).toISOString() : dayjs().startOf('day').toISOString(),
        lte: to ? dayjs(to).toISOString() : dayjs().endOf('day').toISOString(),
      },
    },
    skip: offset || 0,
    take: limit || 500,
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
      medicines: true,
    },
  });
  return { prescriptions };
};

export const getPrescriptionByIdService = async (prescriptionId: string) => {
  const prescription = await prisma.prescription.findFirst({
    where: {
      id: prescriptionId,
    },
    include: {
      medicines: {
        include: { Medicine: true },
      },
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

  return { prescription };
};

export const dispensePrescriptionService = async ({ prescriptionId, medicines, doneBy }: any) => {
  const updatePrescription = await prisma.prescription.update({
    where: { id: prescriptionId },
    data: { pending: false },
  });

  const fullPrescription = await prisma.prescription.findFirst({
    where: { id: prescriptionId },
    include: {
      appointment: {
        select: {
          doctor: true,
          patient: true,
        },
      },
    },
  });

  await addEventLog({
		action: serverActions.UPDATE_PRESCRIPTION,
		fromId: doneBy.id,
		actionId: updatePrescription.id,
		actionTable: 'prescription',
		message: `${doneBy.name} <(${doneBy.email})> updated prescription ${fullPrescription.id} for patient ${fullPrescription.appointment.patient.name} with doctor ${fullPrescription.appointment.doctor.name}`,
	});

  return { prescription: updatePrescription, receipt: {} };
};
