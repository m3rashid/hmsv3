import {
  receptionistLeft,
  createAppointment,
  searchPatients,
} from '../../routes/sockets/reception.socket';
import {
  doctorLeft,
  createPrescriptionByDoctor,
  getDoctorAppointments,
  getDoctorPatients,
  getPatientById,
} from '../../routes/sockets/doctor.socket';
import { IO, Socket } from '../../utils/types';
import { safeSocket } from '../../middlewares/socket';
import { socketConstants } from '../../utils/constants';
import { createPatient, deletePatient } from '../../routes/sockets/coAdmin.socket';
import { pharmacistLeft, dispensePrescription } from '../../routes/sockets/pharmacy.socket';

const router = (io:IO, socket: Socket) => {
  socket.on(socketConstants.receptionistLeft, safeSocket(receptionistLeft)(io, socket));
  socket.on(socketConstants.doctorLeft, safeSocket(doctorLeft)(io, socket));
  socket.on(socketConstants.pharmacistLeft, safeSocket(pharmacistLeft)(io, socket));
  socket.on(socketConstants.getDoctorAppointments, safeSocket(getDoctorAppointments)(io, socket));
  socket.on(socketConstants.getDoctorPatients, safeSocket(getDoctorPatients)(io, socket));
  socket.on(socketConstants.createPatient, safeSocket(createPatient)(io, socket));
  socket.on(socketConstants.deletePatient, safeSocket(deletePatient)(io, socket));
  socket.on(socketConstants.getPatientById, safeSocket(getPatientById)(io, socket));
  socket.on(socketConstants.searchPatients, safeSocket(searchPatients)(io, socket));
  socket.on(socketConstants.createAppointment, safeSocket(createAppointment)(io, socket));
  socket.on(
    socketConstants.createPrescriptionByDoctor,
    safeSocket(createPrescriptionByDoctor)(io, socket)
  );
  socket.on(socketConstants.dispensePrescription, safeSocket(dispensePrescription)(io, socket));
  socket.on(socketConstants.doctorLeft, safeSocket(doctorLeft)(io, socket));
};

export default router
