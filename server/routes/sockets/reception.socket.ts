import { IO, Socket } from '../../utils/types';
import { socketConstants } from '../../utils/constants';
import { searchPatientsService, createAppointmentService } from '../../services';

export const searchPatients =
  (io: IO, socket: Socket) =>
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
  }: any) => {
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
    io.emit(socketConstants.patientsFound, {
      count,
      patients,
    });
  };

export const receptionistLeft =
	(io: IO, socket: Socket) =>
	({ receptionistId }: { receptionistId: string }) => {
		io.emit('receptionist-left', { receptionistId });
	};

export const createAppointment =
	(io: IO, socket: Socket) =>
	async ({ patientId, doctorId, date, remarks }: any) => {
		const data = await createAppointmentService({
			patientId,
			doctorId,
			date,
			remarks,
			doneBy: socket.data.user,
		});

		io.emit(socketConstants.newAppointmentCreated, data);
	};
