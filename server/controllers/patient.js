const {
  createPatientService,
  deletePatientService,
  getPatientByIdService,
  searchPatientsService,
} = require("../services");
const { permissions } = require("../utils/constants");

const createPatient = async (req, res) => {
  if (!req.isAuthenticated) throw new Error("Unauthorized");
  if (!req.permissions.includes(permissions.RECEPTION_CREATE_PATIENT)) {
    throw new Error("Unauthorized for this resource");
  }

  const { newPatient } = await createPatientService(...req.body);

  return res.status(200).json({
    message: "Patient creation Successful",
    newPatient,
  });
};

const deletePatient = async (req, res) => {
  await deletePatientService(req.params.id);

  return res.status(200).json({
    message: "Patient deletion Successful",
  });
};

const getPatientById = async (req, res) => {
  const { patient } = await getPatientByIdService(req.params.id);

  return res.status(200).json({
    message: "Patient found",
    patient,
  });
};

const searchPatients = async (req, res) => {
  console.log(req.query);
  const { count, patients } = await searchPatientsService(req.query);

  return res.status(200).json({
    message: `${count} patients found`,
    patients,
  });
};

module.exports = {
  createPatient,
  deletePatient,
  getPatientById,
  searchPatients,
};
