import { prisma } from './prisma';

interface AddEventLog {
	action: string;
	fromId: string;
	actionId: string;
	actionTable: string;
	message: string;
}
export const addEventLog = async ({
	action,
	fromId,
	actionId,
	actionTable,
	message,
}: AddEventLog) => {
	const log = await prisma.log.create({
		data: {
			action,
			fromId,
			actionId,
			actionTable,
			message,
		},
	});

	return log;
};
