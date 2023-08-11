import { IO, Socket } from '../../utils/types';
import { socketConstants } from '../../utils/constants';
import { dispensePrescriptionService } from '../../services';

export const pharmacistLeft =
	(io: IO, socket: Socket) =>
	({ pharmacistId }: { pharmacistId: string }) => {
		io.emit('pharmacist-left', { pharmacistId });
	};

export const dispensePrescription =
	(io: IO, socket: Socket) =>
	async ({ prescriptionId, medicines }: { prescriptionId: string; medicines: any }) => {
		const data = await dispensePrescriptionService({
			prescriptionId,
			medicines,
			doneBy: socket.data.user,
		});
		io.emit(socketConstants.dispensePrescription, { data });
	};
