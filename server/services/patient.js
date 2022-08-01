const prisma = require("../utils/prisma");

const createPatientService = async (
  name,
  age,
  sex,
  contact,
  address,
  email,
  jamiaId
) => {
  if (!name || !age || !sex || !contact || !email)
    throw new Error("Missing credentials");

  const newPatient = await prisma.Patient.create({
    data: { name, age, sex, contact, address, email, jamiaId },
  });

  return { newPatient };
};

const deletePatientService = async (patientId) => {
  const patient = await prisma.Patient.delete({
    where: { id: patientId },
  });
  if (!patient) throw new Error("Patient not found");

  return;
};

const getPatientByIdService = async (patientId) => {
  const patient = await prisma.Patient.findUnique({
    where: { id: patientId },
  });
  if (!patient) throw new Error("Patient not found");

  return { patient };
};

const searchPatientsService = async ({
  name,
  minAge,
  maxAge,
  sex,
  contact,
  address,
  email,
  jamiaId,
  lastVisitedBefore,
  lastVisitedAfter,
}) => {
  // FIX this bad query
  const whereClause = {
    ...(name && { [Op.like]: `%${name}%` }),
    ...(age && { [Op.gte]: minAge }),
    ...(age && { [Op.lte]: maxAge }),
    ...(sex && { [Op.eq]: sex }),
    ...(contact && { [Op.like]: `%${contact}%` }),
    ...(address && { [Op.like]: `%${address}%` }),
    ...(email && { [Op.like]: `%${email}%` }),
    ...(jamiaId && { [Op.like]: `%${jamiaId}%` }),
    ...(lastVisit && {
      [Op.lte]: new Date(lastVisitedBefore).toISOString(),
    }),
    ...(lastVisit && {
      [Op.gte]: new Date(lastVisitedAfter).toISOString(),
    }),
  };

  console.log(whereClause);

  const patients = await prisma.Patient.findMany({
    where: { [Op.or]: whereClause },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(patients);
  return { count: patients.length, patients };
};

module.exports = {
  createPatientService,
  deletePatientService,
  getPatientByIdService,
  searchPatientsService,
};
