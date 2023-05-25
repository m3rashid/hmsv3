const {
  getDoctorAppointmentsService,
  getDoctorPatientsService,
  getPatientByIdService,
  createPrescriptionService,
} = require("../../services");
const { createDoctorLeaveService } = require("../../services/doctor");

const getDoctorAppointments =
  (io, socket) =>
  async ({ doctorId }) => {
    const { appointments } = await getDoctorAppointmentsService(doctorId);
    io.emit("found-doctor-appointments", {
      doctorId,
      appointments,
    });
  };

const getDoctorPatients =
  (io, socket) =>
  async ({ doctorId }) => {
    const { patients } = await getDoctorPatientsService(doctorId);
    io.emit("found-doctor-patients", {
      doctorId,
      patients,
    });
  };

const getPatientById =
  (io, socket) =>
  async ({ patientId }) => {
    const { patient } = await getPatientByIdService(patientId);
    io.emit("patient-found", {
      patientId,
      patient,
    });
  };

const doctorLeft = (io, socket) => async () => {
  io.emit("doctor-left", { doctorId: socket.user });
};

const createPrescriptionByDoctor =
  (io, socket) =>
  async ({
    appointment,
    symptoms,
    diagnosis,
    CustomMedicines,
    datetime,
    medicines,
  }) => {
    const data = await createPrescriptionService({
      appointment,
      symptoms,
      diagnosis,
      CustomMedicines,
      datetime,
      medicines,
      doneBy: socket.user,
    });

    // console.log(data);

    io.emit("new-prescription-by-doctor-created", { data });
  };

const referAnotherDoctor =
  (io, socket) =>
  async ({ patientId, prevDoctorId, nextDoctorId, date, remarks }) => {
    const appointment = await referAnotherDoctorAppointmentService({
      patientId,
      prevDoctorId,
      nextDoctorId,
      date,
      remarks,
      doneBy: socket.user,
    });

    io.emit("refer-another-doctor", { appointment });
  };

const makeLeaveRequest =
  (io, socket) =>
  async ({ doctorId, date, reason }) => {
    const leaveRequest = await createDoctorLeaveService({
      doctorId,
      date,
      reason,
      doneBy: socket.user,
    });
    io.emit("doctor-left", { leaveRequest });
  };

module.exports = {
  getDoctorAppointments,
  getDoctorPatients,
  getPatientById,
  doctorLeft,
  createPrescriptionByDoctor,
  referAnotherDoctor,
  makeLeaveRequest,
};
