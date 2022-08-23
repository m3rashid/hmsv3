const {
  getDoctorAppointmentsService,
  getDoctorPatientsService,
  getPatientByIdService,
  createPrescriptionService,
} = require("../../services");

const getDoctorAppointments =
  (io, socket) =>
  async ({ doctorId }) => {
    try {
      const { appointments } = await getDoctorAppointmentsService(doctorId);
      io.emit("found-doctor-appointments", {
        doctorId,
        appointments,
      });
    } catch (err) {
      console.log(err);
      io.emit("error", {
        message: err.message || "An error occured",
      });
    }
  };

const getDoctorPatients =
  (io, socket) =>
  async ({ doctorId }) => {
    try {
      const { patients } = await getDoctorPatientsService(doctorId);
      io.emit("found-doctor-patients", {
        doctorId,
        patients,
      });
    } catch (err) {
      console.log(err);
      io.emit("error", {
        message: err.message || "An error occured",
      });
    }
  };

const getPatientById =
  (io, socket) =>
  async ({ patientId }) => {
    try {
      const { patient } = await getPatientByIdService(patientId);
      io.emit("patient-found", {
        patientId,
        patient,
      });
    } catch (err) {
      console.log(err);
      io.emit("error", {
        message: err.message || "An error occured",
      });
    }
  };

const doctorLeft =
  (io, socket) =>
  ({ doctorId }) => {
    try {
      io.emit("doctor-left", { doctorId });
    } catch (err) {
      console.log(err);
      io.emit("error", {
        message: err.message || "An error occured",
      });
    }
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
    try {
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
    } catch (err) {
      console.log(err);
      io.emit("error", {
        message: err.message || "An error occured",
      });
    }
  };

module.exports = {
  getDoctorAppointments,
  getDoctorPatients,
  getPatientById,
  doctorLeft,
  createPrescriptionByDoctor,
};
