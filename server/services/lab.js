const prisma = require("../utils/prisma");

const addTest = async ({ name, description, prescriptionId, testType }) => {
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
  return newTest;
};

const editTest = async ({ testId, ...values }) => {
  if (!testId) throw new Error("Insufficient data");

  const test = await prisma.test.update({
    where: { id: testId },
    data: values,
  });
  return test;
};

const deleteTest = async ({ testId }) => {
  if (!testId) throw new Error("Insufficient data");

  const test = await prisma.test.delete({
    where: { id: testId },
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
