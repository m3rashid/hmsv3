const { createPatientService, deletePatientService } = require('../../services');

export const createPatient = (io, socket) => async (data) => {
  const { patient } = await createPatientService(data, socket.user.permissions, socket.user);
  io.emit('new-patient-created', { data: patient });
};

export const deletePatient =
	(io, socket) =>
	async ({ patientId }: { patientId : string }) => {
		await deletePatientService({
			patientId,
			doneBy: socket.user,
		});
		io.emit('patient-delete-success', { patientId });
	};

