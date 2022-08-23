const {
  getDoctorAppointmentsService,
  getDoctorPatientsService,
  getPatientByIdService,
  createPrescriptionService,
} = require("../../services");

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

const doctorLeft =
  (io, socket) =>
  ({ doctorId }) => {
    io.emit("doctor-left", { doctorId });
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
    console.log(socket.user);
    const data = await createPrescriptionService(
      {
        appointment,
        symptoms,
        diagnosis,
        CustomMedicines,
        datetime,
        medicines,
      },
      socket?.user?.permissions
    );

    console.log(data);
    io.emit("new-prescription-by-doctor-created", { data });
  };

module.exports = {
  getDoctorAppointments,
  getDoctorPatients,
  getPatientById,
  doctorLeft,
  createPrescriptionByDoctor,
};
