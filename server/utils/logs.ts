import { LogModel } from '../models/log';

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
	const log = new LogModel({	action,	fromId,	actionId,	actionTable,	message,});
	await log.save();
	return log;
};
