const {
  searchPatientsService,
  createAppointmentService,
} = require("../../services");

const searchPatients =
  (io, socket) =>
  async ({
    name,
    minAge,
    maxAge,
    sex,
    contact,
    address,
    email,
    jamiaId,
    lastVisitedBefore,
    lastVisitedAfter,
  }) => {
    try {
      const { count, patients } = await searchPatientsService(
        name,
        minAge,
        maxAge,
        sex,
        contact,
        address,
        email,
        jamiaId,
        lastVisitedBefore,
        lastVisitedAfter
      );
      io.emit("patients-found", {
        count,
        patients,
      });
    } catch (err) {
      console.log(err);
      io.emit("error", {
        message: err.message || "An error occured",
      });
    }
  };

const receptionistLeft =
  (io, socket) =>
  ({ receptionistId }) => {
    try {
      io.emit("receptionist-left", { receptionistId });
    } catch (err) {
      console.log(err);
      io.emit("error", {
        message: err.message || "An error occured",
      });
    }
  };

const createAppointment =
  (io, socket) =>
  async ({ patientId, doctorId, date, patient, doctor }) => {
    try {
      console.log("New Appointment : ", patientId, doctorId, date);
      const data = await createAppointmentService({
        patientId,
        patient,
        doctor,
        doctorId,
        date,
      });
      io.emit("new-appointment-created", data);
    } catch (err) {
      console.log(err);
      io.emit("error", {
        message: err.message || "An error occured",
      });
    }
  };

module.exports = {
  receptionistLeft,
  searchPatients,
  createAppointment,
};
