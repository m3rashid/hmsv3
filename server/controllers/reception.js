const { createAppointmentService } = require("../services");

const createAppointment = async (req, res) => {
  if (!req.user || !req.user.id || req.user.role !== "RECEPTIONIST") {
    throw new Error("Unauthorized");
  }

  const { appointment } = await createAppointmentService(req.body);
  return res.status(200).json({ appointment });
};

module.exports = {
  createAppointment,
};
