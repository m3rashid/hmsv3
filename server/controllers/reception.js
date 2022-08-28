const { createAppointmentService } = require("../services");
const { permissions } = require("../utils/constants");

const createAppointment = async (req, res) => {
  if (!req.isAuthenticated) throw new Error("Unauthorized");
  if (!req.permissions.includes(permissions.DOCTOR_APPOINTMENTS)) {
    throw new Error("Unauthorized for this resource");
  }

  const { appointment } = await createAppointmentService({
    ...req.body,
    createdBy: req.userId,
  });
  return res.status(200).json({ appointment });
};

module.exports = {
  createAppointment,
};
