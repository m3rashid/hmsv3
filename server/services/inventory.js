const { faker } = require('@faker-js/faker');
const { Category, MedType } = require('@prisma/client');

const { prisma } = require('../utils/prisma');
const { addEventLog } = require('../utils/logs');
const { InventoryTypes, serverActions } = require('../utils/constants');
const { dummymedicines, dummynonmedicines, dummyotherassets } = require('./dummy');

const addMedicineService = async ({
  type,
  data,

  // TODO unhandled in sockets
  doneBy,
}) => {
  let asset;
  let assetType;

  if (type == InventoryTypes.Medicine) {
    asset = await prisma.medicine.create({ data });
    assetType = 'medicine';
  } else if (type == InventoryTypes.NonMedicine) {
    asset = await prisma.nonMedicine.create({ data });
    assetType = 'nonMedicine';
  } else if (type == InventoryTypes.OtherAssets) {
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

const DeleteInventoryService = async ({
  medicineId,
  type,

  // TODO unhandled in sockets
  doneBy,
}) => {
  if (!medicineId) throw new Error('Invalid medicineId');
  let asset;
  let assetType;

  if (type == InventoryTypes.Medicine) {
    asset = await prisma.medicine.delete({
      where: { id: medicineId },
    });
    assetType = 'medicine';
  } else if (type == InventoryTypes.NonMedicine) {
    asset = await prisma.nonMedicine.delete({
      where: { id: medicineId },
    });
    assetType = 'nonMedicine';
  } else if (type == InventoryTypes.OtherAssets) {
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

const editMedicineService = async ({
  id,
  data,
  type,

  // TODO unhandled in sockets
  doneBy,
}) => {
  let asset;
  let assetType;

  if (type == InventoryTypes.Medicine) {
    asset = await prisma.medicine.update({
      where: { id: id },
      data: data,
    });
    assetType = 'medicine';
  } else if (type === InventoryTypes.NonMedicine) {
    asset = await prisma.nonMedicine.update({
      where: { id: id },
      data: data,
    });
    assetType = 'nonMedicine';
  } else if (type === InventoryTypes.OtherAssets) {
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

const getMedicine = async (medicineId) => {
  const gotMedicine = await prisma.inventory.findUnique({
    where: { id: medicineId },
  });
  return gotMedicine;
};

const addDummy = async () => {
  const type = faker.helpers.arrayElement(Object.values(InventoryTypes));
  if (type === InventoryTypes.Medicine) {
    await prisma.medicine.create({
      data: {
        name: faker.helpers.arrayElement(dummymedicines),
        batchNumber: faker.datatype.uuid(),
        category: faker.helpers.arrayElement(Object.values(Category)),
        expiryDate: faker.date.future(),
        medType: faker.helpers.arrayElement(Object.values(MedType)),
        quantity: faker.datatype.number({ min: 1, max: 100 }),
        manufacturer: faker.company.companyName(),
      },
    });
  } else if (type === InventoryTypes.NonMedicine) {
    await prisma.nonMedicine.create({
      data: {
        name: faker.helpers.arrayElement(dummynonmedicines),
        batchNumber: faker.datatype.uuid(),
        expiryDate: faker.date.future(),
        quantity: faker.datatype.number({ min: 1, max: 100 }),
      },
    });
  } else {
    await prisma.otherAssets.create({
      data: {
        quantity: faker.datatype.number({ min: 1, max: 100 }),
        name: faker.helpers.arrayElement(dummyotherassets),
      },
    });
  }
};

const searchInventoryService = async (type, { quantity, price, name }) => {
  let inventory = [];
  const queries = [{ quantity: { gte: quantity } }, { name: { contains: name } }];
  if (type == InventoryTypes.Medicine) {
    inventory = await prisma.medicine.findMany({
      where: { OR: queries },
    });
  } else if (type == InventoryTypes.NonMedicine) {
    inventory = await prisma.nonMedicine.findMany({
      where: { OR: queries },
    });
  } else if (type == InventoryTypes.OtherAssets) {
    inventory = await prisma.otherAssets.findMany({
      where: { OR: queries },
    });
  }
  return inventory;
};

module.exports = {
  addMedicineService,
  DeleteInventoryService,
  editMedicineService,
  getMedicine,
  addDummy,
  searchInventoryService,
};
