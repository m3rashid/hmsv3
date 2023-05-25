const { makeLeaveRequest } = require("../routes/sockets/doctor.socket");
const {
  getDoctorAppointmentsService,
  getDoctorPatientsService,
  searchDoctorsService,
  createPrescriptionService,
  referAnotherDoctorAppointmentService,
  checkMedAvailabilityService,
  getAppointmentByIdService,
  getPrescriptionByAppointmentService,
} = require("../services");
const { permissions } = require("../utils/constants");

const getDoctorAppointments = async (req, res) => {
  if (!req.isAuthenticated) throw new Error("Unauthorized");
  if (!req.permissions.includes(permissions.DOCTOR_APPOINTMENTS)) {
    throw new Error("Unauthorized for this resource");
  }

  const { appointments } = await getDoctorAppointmentsService(req.user.id);

  return res.status(200).json({
    appointments,
  });
};

const getAppointmentById = async (req, res) => {
  if (!req.isAuthenticated) throw new Error("Unauthorized");
  if (!req.permissions.includes(permissions.DOCTOR_APPOINTMENTS)) {
    throw new Error("Unauthorized for this resource");
  }

  const data = await getAppointmentByIdService(req.query.id);
  return res.status(200).json(data);
};

const getDoctorPatients = async (req, res) => {
  if (!req.isAuthenticated) throw new Error("Unauthorized");

  const { patients } = await getDoctorPatientsService(req.user.id);
  return res.status(200).json({
    patients,
  });
};

const searchDoctors = async (req, res) => {
  const { count, doctors } = await searchDoctorsService(req.query);

  return res.status(200).json({
    message: `${count} doctors found`,
    doctors,
  });
};

const createPrescriptionByDoctor = async (req, res) => {
  if (!req.isAuthenticated) throw new Error("Unauthorized");
  if (!req.permissions.includes(permissions.DOCTOR_PRESCRIBE_MEDICINE)) {
    throw new Error("Unauthorized for this resource");
  }

  const {
    appointment,
    symptoms,
    diagnosis,
    customMedicines,
    datetime,
    medicines,
  } = req.body;

  const { prescription: newPrescription } = await createPrescriptionService({
    appointment,
    symptoms,
    diagnosis,
    customMedicines,
    datetime,
    medicines,
    doneBy: req.user,
  });

  return res.status(200).json({
    newPrescription,
  });
};

const referAnotherDoctor = async (req, res) => {
  if (!req.isAuthenticated) throw new Error("Unauthorized");
  if (!req.permissions.includes(permissions.DOCTOR_PRESCRIBE_MEDICINE)) {
    throw new Error("Unauthorized for this resource");
  }

  const appointment = await referAnotherDoctorAppointmentService({
    patientId: req.body.patientId,
    prevDoctorId: req.body.prevDoctorId,
    nextDoctorId: req.body.nextDoctorId,
    date: req.body.date,
    remarks: req.body.remarks,
    doneBy: req.user,
  });

  return res.status(200).json({
    appointment,
  });
};

const checkMedAvailability = async (req, res) => {
  const { dosage, medicineId, duration } = req.body;

  const data = await checkMedAvailabilityService({
    dosage,
    medicineId,
    duration,
  });

  return res.status(200).json(data);
};

const GetPrescriptionByAppointmentID = async (req, res) => {
  const { id } = req.query;

  // console.log(req.query);

  const data = await getPrescriptionByAppointmentService({
    id,
  });

  return res.status(200).json(data);
};

const makeDoctorLeave = async (req, res) => {
  if (!req.isAuthenticated) throw new Error("Unauthorized");

  const date = new Date();
  const { doctorId, reason } = req.body;

  const data = await makeLeaveRequest(doctorId, reason, date, req.user);

  return res.status(200).json(data);
};

module.exports = {
  searchDoctors,
  getDoctorPatients,
  referAnotherDoctor,
  getAppointmentById,
  getDoctorAppointments,
  createPrescriptionByDoctor,
  checkMedAvailability,
  GetPrescriptionByAppointmentID,
  makeDoctorLeave,
};
