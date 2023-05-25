const { permissions } = require('../utils/constants');
const { createAppointmentService } = require('../services');
const { getAllAppointmentsService } = require('../services/reception');

const getAllAppointments = async (req, res) => {
  if (!req.isAuthenticated) throw new Error('Unauthorized');
  if (!req.permissions.includes(permissions.DOCTOR_APPOINTMENTS)) {
    throw new Error('Unauthorized for this resource');
  }

  const appointments = await getAllAppointmentsService();

  return res.status(200).json({
    appointments,
  });
};

const createAppointment = async (req, res) => {
  if (!req.isAuthenticated) throw new Error('Unauthorized');
  if (!req.permissions.includes(permissions.DOCTOR_APPOINTMENTS)) {
    throw new Error('Unauthorized for this resource');
  }

  const { appointment } = await createAppointmentService({
    ...req.body,
    doneBy: req.user,
  });
  return res.status(200).json({ appointment });
};

module.exports = {
  createAppointment,
  getAllAppointments,
};
