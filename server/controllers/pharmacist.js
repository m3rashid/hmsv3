const {
  dispensePrescriptionService,
  getAllPrescriptionsService,
  getPrescriptionByIdService,
} = require("../services");
const { permissions } = require("../utils/constants");

const getAllPrescriptions = async (req, res) => {
  if (!req.isAuthenticated) throw new Error("Unauthorized");
  if (!req.permissions.includes(permissions.PHARMACY_PRESCRIPTIONS)) {
    throw new Error("Unauthorized for this resource");
  }

  const { prescriptions } = await getAllPrescriptionsService(req.query);

  return res.status(200).json({
    prescriptions,
  });
};

const getPrescriptionById = async (req, res) => {
  if (!req.isAuthenticated) throw new Error("Unauthorized");
  if (!req.permissions.includes(permissions.PHARMACY_PRESCRIPTIONS)) {
    throw new Error("Unauthorized for this resource");
  }

  console.log(req.params.id);
  const { prescription } = await getPrescriptionByIdService(
    parseInt(req.params.id)
  );
  return res.status(200).json({
    prescription,
  });
};

const dispensePrescription = async (req, res) => {
  if (!req.user || !req.user.id) throw new Error("Unauthorized");

  const { receipt } = await dispensePrescriptionService(req.body);
  return res.status(200).json({
    receipt,
  });
};

module.exports = {
  getAllPrescriptions,
  getPrescriptionById,
  dispensePrescription,
};
