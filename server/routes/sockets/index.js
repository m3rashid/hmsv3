const {
  receptionistLeft,
  createAppointment,
  searchPatients,
} = require("./reception.socket.js");
const {
  doctorLeft,
  createPrescriptionByDoctor,
  getDoctorAppointments,
  getDoctorPatients,
  getPatientById,
} = require("./doctor.socket");
const { createUser } = require("./admin.socket");
const { safeSocket } = require("../../middlewares/socket");
const { socketConstants } = require("../../utils/constants.js");
const { pharmacistLeft, dispensePrescription } = require("./pharmacy.socket");
const { createPatient, deletePatient } = require("./coadmin.socket");

const router = (io, socket) => {
  socket.on(
    socketConstants.receptionistLeft,
    safeSocket(receptionistLeft)(io, socket)
  );
  socket.on(socketConstants.doctorLeft, safeSocket(doctorLeft)(io, socket));
  socket.on(
    socketConstants.pharmacistLeft,
    safeSocket(pharmacistLeft)(io, socket)
  );
  socket.on(socketConstants.createUser, safeSocket(createUser)(io, socket));
  socket.on(
    socketConstants.getDoctorAppointments,
    safeSocket(getDoctorAppointments)(io, socket)
  );
  socket.on(
    socketConstants.getDoctorPatients,
    safeSocket(getDoctorPatients)(io, socket)
  );
  socket.on(
    socketConstants.createPatient,
    safeSocket(createPatient)(io, socket)
  );
  socket.on(
    socketConstants.deletePatient,
    safeSocket(deletePatient)(io, socket)
  );
  socket.on(
    socketConstants.getPatientById,
    safeSocket(getPatientById)(io, socket)
  );
  socket.on(
    socketConstants.searchPatients,
    safeSocket(searchPatients)(io, socket)
  );
  socket.on(
    socketConstants.createAppointment,
    safeSocket(createAppointment)(io, socket)
  );
  socket.on(
    socketConstants.createPrescriptionByDoctor,
    safeSocket(createPrescriptionByDoctor)(io, socket)
  );
  socket.on(
    socketConstants.dispensePrescription,
    safeSocket(dispensePrescription)(io, socket)
  );
};

module.exports = {
  router,
};
