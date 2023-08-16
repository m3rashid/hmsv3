import { TestModel } from '../models/test';
import { addEventLog } from '../utils/logs';

export const addTest = async ({ name, description, prescriptionId, testType, doneBy }: any) => {
	if (!name || !prescriptionId || !testType) {
		throw new Error('Insufficient data');
	}

	const newTest = new TestModel({ name, description, prescriptionId, testType });
	await newTest.save();
	const getNewTest = await TestModel.findById(newTest._id).populate('prescription');

	await addEventLog({
		action: serverActions.CREATE_TEST,
		fromId: doneBy.id,
		actionId: newTest.id,
		actionTable: 'test',
		message: `${doneBy.name} <(${doneBy.email})> added new test ${getNewTest.name} for patient ${getNewTest.prescription.appointment.patient.name}`,
	});

	return newTest;
};

export const editTest = async ({ testId, doneBy, ...values }: any) => {
	if (!testId) throw new Error('Insufficient data');

	const test = await TestModel.findByIdAndUpdate(testId, values);
	const getNewTest = await TestModel.findById(testId).populate('prescription');

	await addEventLog({
		action: serverActions.EDIT_TEST,
		fromId: doneBy.id,
		actionId: test.id,
		actionTable: 'test',
		message: `${doneBy.name} <(${doneBy.email})> edited test ${getNewTest.name} for patient ${getNewTest.prescription.appointment.patient.name}`,
	});

	return test;
};

export const deleteTest = async ({ testId, doneBy }: any) => {
	if (!testId) throw new Error('Insufficient data');

	const getNewTest = await TestModel.findById(testId).populate('prescription');
	const test = await TestModel.findByIdAndDelete(getNewTest._id);

	await addEventLog({
		action: serverActions.DELETE_TEST,
		fromId: doneBy.id,
		actionId: testId,
		actionTable: 'test',
		message: `${doneBy.name} <(${doneBy.email})> deleted test ${getNewTest.name} for patient ${getNewTest.prescription.appointment.patient.name}`,
	});

	return test;
};

export const getTest = async ({ testId, prescriptionId }: any) => {
	if (!testId && !prescriptionId) throw new Error('Insufficient data');
	const test = await TestModel.find({
		$OR: [{ _id: testId }, { prescriptionId: prescriptionId }],
	}).populate('prescription');
	return test;
};

export const getTestsByType = async ({ testType }: any) => {
	if (!testType) throw new Error('Insufficient data');

	const tests = await TestModel.find({
		testType,
	}).populate('prescription');
	return tests;
};

export const getAllTests = async ({}) => {
	const tests = await TestModel.find({}).populate('prescription');
	return tests;
};
