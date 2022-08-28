const { serverActions } = require("../utils/constants");
const { addEventLog } = require("../utils/logs");
const prisma = require("../utils/prisma");

const addTest = async ({
  name,
  description,
  prescriptionId,
  testType,

  // TODO unhandled
  createdBy,
}) => {
  if (!name || !prescriptionId || !testType) {
    throw new Error("Insufficient data");
  }

  const newTest = await prisma.test.create({
    data: {
      name,
      description,
      prescriptionId,
      testType,
    },
  });

  await addEventLog({
    action: serverActions.CREATE_TEST,
    fromId: createdBy,
    actionId: newTest.id,
    actionTable: "test",
  });

  return newTest;
};

const editTest = async ({
  testId,

  // TODO unhandled
  createdBy,

  ...values
}) => {
  if (!testId) throw new Error("Insufficient data");

  const test = await prisma.test.update({
    where: { id: testId },
    data: values,
  });

  await addEventLog({
    action: serverActions.EDIT_TEST,
    fromId: createdBy,
    actionId: test.id,
    actionTable: "test",
  });

  return test;
};

const deleteTest = async ({
  testId,

  // TODO unhandled
  createdBy,
}) => {
  if (!testId) throw new Error("Insufficient data");

  const test = await prisma.test.delete({
    where: { id: testId },
  });

  await addEventLog({
    action: serverActions.DELETE_TEST,
    fromId: createdBy,
    actionId: testId,
    actionTable: "test",
  });

  return test;
};

const getTest = async ({ testId, prescriptionId }) => {
  if (!testId && !prescriptionId) throw new Error("Insufficient data");

  const test = await prisma.test.findUnique({
    where: {
      OR: [{ id: testId }, { prescriptionId: prescriptionId }],
    },
    include: { prescription: true },
  });
  return test;
};

const getTestsByType = async ({ testType }) => {
  if (!testType) throw new Error("Insufficient data");

  const tests = await prisma.test.findMany({
    where: { testType },
    include: { prescription: true },
  });
  return tests;
};

const getAllTests = async ({}) => {
  const tests = await prisma.test.findMany({
    include: { prescription: true },
  });
  return tests;
};

module.exports = {
  addTest,
  editTest,
  deleteTest,
  getTest,
  getTestsByType,
  getAllTests,
};
