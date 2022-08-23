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
  };

const receptionistLeft =
  (io, socket) =>
  ({ receptionistId }) => {
    io.emit("receptionist-left", { receptionistId });
  };

const createAppointment =
  (io, socket) =>
  async ({ patientId, doctorId, date, patient, doctor }) => {
    console.log("New Appointment : ", patientId, doctorId, date);
    const data = await createAppointmentService({
      patientId,
      patient,
      doctor,
      doctorId,
      date,
    });
    io.emit("new-appointment-created", data);
  };

module.exports = {
  receptionistLeft,
  searchPatients,
  createAppointment,
};
