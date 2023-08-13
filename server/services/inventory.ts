import faker from "@faker-js/faker"
import { CONSTANTS } from "gatekeeper";
import { dummyMedicines, dummyNonMedicines, dummyOtherAssets } from "./dummy";

export const addMedicineService = async ({
  type,
  data,

  // TODO unhandled in sockets
  doneBy,
}: any) => {
  let asset;
  let assetType;

  if (type == CONSTANTS.InventoryTypes.medicine) {
    asset = await prisma.medicine.create({ data });
    assetType = 'medicine';
  } else if (type == CONSTANTS.InventoryTypes.nonMedicine) {
		asset = await prisma.nonMedicine.create({ data });
		assetType = 'nonMedicine';
	} else if (type == CONSTANTS.InventoryTypes.otherAsset) {
		asset = await prisma.otherAssets.create({ data });
		assetType = 'otherAssets';
	} else {
		throw new Error('Invalid type');
	}

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

	if (type == CONSTANTS.InventoryTypes.medicine) {
		asset = await prisma.medicine.delete({
			where: { id: medicineId },
		});
		assetType = 'medicine';
	} else if (type == CONSTANTS.InventoryTypes.nonMedicine) {
		asset = await prisma.nonMedicine.delete({
			where: { id: medicineId },
		});
		assetType = 'nonMedicine';
	} else if (type == CONSTANTS.InventoryTypes.otherAsset) {
		asset = await prisma.otherAssets.delete({
			where: { id: medicineId },
		});
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

	if (type == CONSTANTS.InventoryTypes.medicine) {
		asset = await prisma.medicine.update({
			where: { id: id },
			data: data,
		});
		assetType = 'medicine';
	} else if (type === CONSTANTS.InventoryTypes.nonMedicine) {
		asset = await prisma.nonMedicine.update({
			where: { id: id },
			data: data,
		});
		assetType = 'nonMedicine';
	} else if (type === CONSTANTS.InventoryTypes.otherAsset) {
		asset = await prisma.otherAssets.update({
			where: { id: id },
			data: data,
		});
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

export const getMedicine = async (medicineId: string) => {
  const gotMedicine = await prisma.inventory.findUnique({
    where: { id: medicineId },
  });
  return gotMedicine;
};

export const addDummy = async () => {
  const type = faker.helpers.arrayElement(Object.values(CONSTANTS.InventoryTypes));
  if (type === CONSTANTS.InventoryTypes.medicine) {
		await prisma.medicine.create({
			data: {
				name: faker.helpers.arrayElement(dummyMedicines),
				batchNumber: faker.datatype.uuid(),
				category: faker.helpers.arrayElement(CONSTANTS.Categories),
				expiryDate: faker.date.future(),
				medType: faker.helpers.arrayElement(CONSTANTS.MedType),
				quantity: faker.datatype.number({ min: 1, max: 100 }),
				manufacturer: faker.company.companyName(),
			},
		});
	} else if (type === CONSTANTS.InventoryTypes.nonMedicine) {
		await prisma.nonMedicine.create({
			data: {
				name: faker.helpers.arrayElement(dummyNonMedicines),
				batchNumber: faker.datatype.uuid(),
				expiryDate: faker.date.future(),
				quantity: faker.datatype.number({ min: 1, max: 100 }),
			},
		});
	} else {
		await prisma.otherAssets.create({
			data: {
				quantity: faker.datatype.number({ min: 1, max: 100 }),
				name: faker.helpers.arrayElement(dummyOtherAssets),
			},
		});
	}
};

export const searchInventoryService = async (type: CONSTANTS.InventoryType, { quantity, price, name }: any) => {
  let inventory = [];
  const queries = [{ quantity: { gte: quantity } }, { name: { contains: name } }];
  if (type == CONSTANTS.InventoryTypes.medicine) {
		inventory = await prisma.medicine.findMany({
			where: { OR: queries },
		});
	} else if (type == CONSTANTS.InventoryTypes.nonMedicine) {
		inventory = await prisma.nonMedicine.findMany({
			where: { OR: queries },
		});
	} else if (type == CONSTANTS.InventoryTypes.otherAsset) {
		inventory = await prisma.otherAssets.findMany({
			where: { OR: queries },
		});
	}
  return inventory;
};
