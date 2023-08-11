import { IO, Socket } from '../../utils/types';
import { socketConstants } from '../../utils/constants';
import { createPatientService, deletePatientService } from '../../services';

export const createPatient = (io: IO, socket: Socket) => async (data: any) => {
	const { patient } = await createPatientService(
		data,
		socket.data.user.permissions,
		socket.data.user
	);
	io.emit(socketConstants.newPatientCreated, { data: patient });
};

export const deletePatient =
	(io: IO, socket: Socket) =>
	async ({ patientId }: { patientId: string }) => {
		await deletePatientService({
			patientId,
			doneBy: socket.data.user,
		});
		io.emit('patient-delete-success', { patientId });
	};
