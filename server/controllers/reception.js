const {
  createAppointmentService,
  getAppointmentByIdService,
} = require("../services/reception.js");
const { createPatientService } = require("../services/patient.js");

const createAppointment = async (req, res) => {
  if (!req.user || !req.user.id || req.user.role !== "RECEPTIONIST") {
    throw new Error("Unauthorized");
  }

  const { appointment } = await createAppointmentService(req.body);
  return res.status(200).json({ appointment });
};

const getAppointmentById = async (req, res) => {
  if (!req.user || !req.user.id || req.user.role !== "RECEPTIONIST") {
    throw new Error("Unauthorized");
  }

  const data = await getAppointmentByIdService(req.query.id);
  console.log(data);
  return res.status(200).json(data);
};

const createPatient = async (req, res) => {
  if (!req.user || !req.user.id || req.user.role !== "RECEPTIONIST") {
    throw new Error("Unauthorized");
  }

  const { patient } = await createPatientService(req.body);
  return res.status(200).json({ patient });
};

module.exports = {
  createAppointment,
  getAppointmentById,
  createPatient,
};
