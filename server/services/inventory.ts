import { faker } from '@faker-js/faker';
import { MODEL_CONSTANTS } from 'gatekeeper';
import { dummyMedicines, dummyNonMedicines, dummyOtherAssets } from './dummy';
import { MedicineModel } from '../models/medicine';
import { NonMedicineModel } from '../models/nonMedicine';
import { OtherAssetsModel } from '../models/otherAssets';

export const addMedicineService = async ({
	type,
	data,

	// TODO unhandled in sockets
	doneBy,
}: any) => {
	let asset;
	let assetType;

	if (type == MODEL_CONSTANTS.InventoryTypes.medicine) {
		asset = new MedicineModel({ data });
		assetType = 'medicine';
	} else if (type == MODEL_CONSTANTS.InventoryTypes.nonMedicine) {
		asset = new NonMedicineModel({ data });
		assetType = 'nonMedicine';
	} else if (type == MODEL_CONSTANTS.InventoryTypes.otherAsset) {
		asset = new OtherAssetsModel({ data });
		assetType = 'otherAssets';
	} else {
		throw new Error('Invalid type');
	}

	await asset.save();

	await addEventLog({
		action: serverActions.ADD_INVENTORY,
		fromId: doneBy.id,
		actionId: asset.id,
		actionTable: assetType,
		message: `${doneBy.name} <(${doneBy.email})> added item ${asset.name} (${asset.quantity}) to the inventory`,
	});

	return asset;
};

export const DeleteInventoryService = async ({
	medicineId,
	type,

	// TODO unhandled in sockets
	doneBy,
}: any) => {
	if (!medicineId) throw new Error('Invalid medicineId');
	let asset;
	let assetType;

	if (type == MODEL_CONSTANTS.InventoryTypes.medicine) {
		asset = await MedicineModel.findByIdAndDelete(medicineId);
		assetType = 'medicine';
	} else if (type == MODEL_CONSTANTS.InventoryTypes.nonMedicine) {
		asset = await NonMedicineModel.findByIdAndDelete(medicineId);
		assetType = 'nonMedicine';
	} else if (type == MODEL_CONSTANTS.InventoryTypes.otherAsset) {
		asset = await OtherAssetsModel.findByIdAndDelete(medicineId);
		assetType = 'otherAssets';
	} else {
		throw new Error('Invalid type');
	}

	await addEventLog({
		action: serverActions.DELETE_INVENTORY,
		fromId: doneBy.id,
		actionId: medicineId,
		actionTable: assetType,
		message: `${doneBy.name} <(${doneBy.email})> deleted item ${asset.name} having (${asset.quantity}) count from the inventory`,
	});

	return asset;
};

export const editMedicineService = async ({
	id,
	data,
	type,

	// TODO unhandled in sockets
	doneBy,
}: any) => {
	let asset;
	let assetType;

	if (type == MODEL_CONSTANTS.InventoryTypes.medicine) {
		asset = await MedicineModel.findByIdAndUpdate(id, data);
		assetType = 'medicine';
	} else if (type === MODEL_CONSTANTS.InventoryTypes.nonMedicine) {
		asset = await NonMedicineModel.findByIdAndUpdate(id, data);
		assetType = 'nonMedicine';
	} else if (type === MODEL_CONSTANTS.InventoryTypes.otherAsset) {
		asset = await OtherAssetsModel.findByIdAndUpdate(id, data);
		assetType = 'otherAssets';
	} else {
		throw new Error('Invalid type');
	}

	await addEventLog({
		action: serverActions.EDIT_INVENTORY,
		fromId: doneBy.id,
		actionId: asset.id,
		actionTable: assetType,
		message: `${doneBy.name} <(${doneBy.email})> edited item ${asset.name} having (${asset.quantity}) count in the inventory`,
	});

	return asset;
};

// export const getMedicine = async (medicineId: string) => {
// 	const gotMedicine = await prisma.inventory.findUnique({
// 		where: { id: medicineId },
// 	});
// 	return gotMedicine;
// };

export const addDummy = async () => {
	const type = faker.helpers.arrayElement(Object.values(MODEL_CONSTANTS.InventoryTypes));
	if (type === MODEL_CONSTANTS.InventoryTypes.medicine) {
		const medicines = new MedicineModel({
			data: {
				name: faker.helpers.arrayElement(dummyMedicines),
				batchNumber: faker.datatype.uuid(),
				category: faker.helpers.arrayElement(MODEL_CONSTANTS.Categories),
				expiryDate: faker.date.future(),
				medType: faker.helpers.arrayElement(MODEL_CONSTANTS.MedType),
				quantity: faker.number.int({ min: 1, max: 100 }),
				manufacturer: faker.company.name(),
			},
		});
		await medicines.save();
	} else if (type === MODEL_CONSTANTS.InventoryTypes.nonMedicine) {
		const nonMedicines = new NonMedicineModel({
			data: {
				name: faker.helpers.arrayElement(dummyNonMedicines),
				batchNumber: faker.datatype.uuid(),
				expiryDate: faker.date.future(),
				quantity: faker.datatype.number({ min: 1, max: 100 }),
			},
		});
		await nonMedicines.save();
	} else {
		const otherAssets = new OtherAssetsModel({
			data: {
				quantity: faker.datatype.number({ min: 1, max: 100 }),
				name: faker.helpers.arrayElement(dummyOtherAssets),
			},
		});
		await otherAssets.save();
	}
};

export const searchInventoryService = async (
	type: MODEL_CONSTANTS.InventoryType,
	{ quantity, price, name }: any
) => {
	let inventory = [];
	const queries = [{ quantity: { gte: quantity } }, { name: { contains: name } }];
	if (type == MODEL_CONSTANTS.InventoryTypes.medicine) {
		inventory = await MedicineModel.find(queries);
	} else if (type == MODEL_CONSTANTS.InventoryTypes.nonMedicine) {
		inventory = await NonMedicineModel.find(queries);
	} else if (type == MODEL_CONSTANTS.InventoryTypes.otherAsset) {
		inventory = await OtherAssetsModel.find(queries);
	}
	return inventory;
};
