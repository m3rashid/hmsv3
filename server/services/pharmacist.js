const dayjs = require("dayjs");

const { addEventLog } = require("../utils/logs");
const { serverActions } = require("../utils/constants");

const { prisma } = require("../utils/prisma");

const getAllPrescriptionsService = async ({ limit, from, to, offset }) => {
  const prescriptions = await prisma.prescription.findMany({
    where: {
      datePrescribed: {
        gte: from
          ? dayjs(from).toISOString()
          : dayjs().startOf("day").toISOString(),
        lte: to ? dayjs(to).toISOString() : dayjs().endOf("day").toISOString(),
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

const getPrescriptionByIdService = async (prescriptionId) => {
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

const dispensePrescriptionService = async ({
  prescriptionId,
  medicines,
  doneBy,
}) => {
  const updatePrescription = await prisma.prescription.update({
    where: { id: prescriptionId },
    data: { pending: false },
  });

  const getFullprescription = await prisma.prescription.findFirst({
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
    actionTable: "prescription",
    message: `${doneBy.name} <(${doneBy.email})> updated prescription ${getFullprescription.id} for patient ${getFullprescription.appointment.patient.name} with doctor ${getFullprescription.appointment.doctor.name}`,
  });

  return { prescription: updatePrescription, receipt: {} };
};

module.exports = {
  dispensePrescriptionService,
  getAllPrescriptionsService,
  getPrescriptionByIdService,
};
