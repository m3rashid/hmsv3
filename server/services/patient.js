const prisma = require("../utils/prisma");
const { permissions } = require("../utils/constants");
const { checkAccess } = require("../utils/auth.helpers");

const createPatientService = async (
  { name, age, sex, contact, address, email, jamiaId },
  UserPermissions
) => {
  if (!checkAccess([permissions.RECEPTION_CREATE_PATIENT], UserPermissions)) {
    throw new Error("Forbidden");
  }

  const data = { name, age, sex, contact, address, email, jamiaId };
  console.log(data);
  if (!name || !age || !sex || !contact || !email) {
    throw new Error("Missing credentials");
  }

  const newPatient = await prisma.patient.create({
    data: {
      name,
      age,
      contact,
      sex,
      address,
      email,
      jamiaId,
    },
  });
  console.log("new Patient", newPatient);
  return { patient: newPatient };
};

const deletePatientService = async (patientId) => {
  console.log({ patientId });
  const patient = await prisma.Patient.delete({
    where: { id: patientId },
  });
  if (!patient) throw new Error("Patient not found");
  return patient;
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
  const patients = await prisma.Patient.findMany({
    where: {
      OR: [
        { name: { contains: name } },
        { age: { gte: minAge, lte: maxAge } },
        { sex: { eq: sex } },
        { contact: { contains: contact } },
        { address: { contains: address } },
        { email: { contains: email } },
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  return { count: patients.length, patients };
};

module.exports = {
  createPatientService,
  deletePatientService,
  getPatientByIdService,
  searchPatientsService,
};
