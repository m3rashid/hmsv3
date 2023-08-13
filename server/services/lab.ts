import { addEventLog } from "../utils/logs";

export const addTest = async ({ name, description, prescriptionId, testType, doneBy }: any) => {
  if (!name || !prescriptionId || !testType) {
    throw new Error('Insufficient data');
  }

  const newTest = await prisma.test.create({
    data: {
      name,
      description,
      prescriptionId,
      testType,
    },
  });

  const getNewTest = await prisma.test.findFirst({
    where: { id: newTest.id },
    include: {
      prescription: {
        select: {
          appointment: {
            select: {
              patient: { select: { name: true, contact: true } },
            },
          },
        },
      },
    },
  });

  await addEventLog({
    action: serverActions.CREATE_TEST,
    fromId: doneBy.id,
    actionId: newTest.id,
    actionTable: 'test',
    message: `${doneBy.name} <(${doneBy.email})> added new test ${getNewTest.name} for patient ${getNewTest.prescription.appointment.patient.name}`,
  });

  return newTest;
};

export const editTest = async ({ testId, doneBy, ...values }: any) => {
  if (!testId) throw new Error('Insufficient data');

  const test = await prisma.test.update({
    where: { id: testId },
    data: values,
  });

  const getNewTest = await prisma.test.findFirst({
    where: { id: testId },
    include: {
      prescription: {
        select: {
          appointment: {
            select: {
              patient: { select: { name: true, contact: true } },
            },
          },
        },
      },
    },
  });

  await addEventLog({
    action: serverActions.EDIT_TEST,
    fromId: doneBy.id,
    actionId: test.id,
    actionTable: 'test',
    message: `${doneBy.name} <(${doneBy.email})> edited test ${getNewTest.name} for patient ${getNewTest.prescription.appointment.patient.name}`,
  });

  return test;
};

export const deleteTest = async ({ testId, doneBy }: any) => {
  if (!testId) throw new Error('Insufficient data');

  const getNewTest = await prisma.test.findFirst({
    where: { id: testId },
    include: {
      prescription: {
        select: {
          appointment: {
            select: {
              patient: { select: { name: true, contact: true } },
            },
          },
        },
      },
    },
  });

  const test = await prisma.test.delete({ where: { id: testId } });

  await addEventLog({
    action: serverActions.DELETE_TEST,
    fromId: doneBy.id,
    actionId: testId,
    actionTable: 'test',
    message: `${doneBy.name} <(${doneBy.email})> deleted test ${getNewTest.name} for patient ${getNewTest.prescription.appointment.patient.name}`,
  });

  return test;
};

export const getTest = async ({ testId, prescriptionId }: any) => {
  if (!testId && !prescriptionId) throw new Error('Insufficient data');

  const test = await prisma.test.findUnique({
    where: {
      OR: [{ id: testId }, { prescriptionId: prescriptionId }],
    },
    include: { prescription: true },
  });
  return test;
};

export const getTestsByType = async ({ testType }: any) => {
  if (!testType) throw new Error('Insufficient data');

  const tests = await prisma.test.findMany({
    where: { testType },
    include: { prescription: true },
  });
  return tests;
};

export const getAllTests = async ({}) => {
  const tests = await prisma.test.findMany({
    include: { prescription: true },
  });
  return tests;
};
