const {
  addDummy,
  searchInventoryService,
  addMedicineService,
  editMedicineService,
  DeleteInventoryService,
} = require("../services");
const { permissions } = require("../utils/constants");

const CreateDummyInventory = async (req, res) => {
  const count = req.body.count;

  for (let i = 0; i < count; i++) await addDummy();

  return res.status(200).json({
    message: "Dummy inventory created",
  });
};

const SearchMedicines = async (req, res) => {
  const { quantity, name, type } = req.query;

  const inventory = await searchInventoryService(type, {
    quantity,
    name,
  });

  return res.status(200).json({
    message: `${inventory.length} Inventory found`,
    inventory,
  });
};

const addMedicine = async (req, res) => {
  if (!req.isAuthenticated) throw new Error("Unauthorized");
  if (!req.permissions.includes(permissions.INVENTORY_ADD_MEDICINE)) {
    throw new Error("Unauthorized for this resource");
  }

  const { type, data } = req.body;
  const item = await addMedicineService({ type, data, doneBy: req.user });

  return res.status(200).json({
    message: "Medicine added",
    data: item,
  });
};

const EditInventory = async (req, res) => {
  if (!req.isAuthenticated) throw new Error("Unauthorized");
  const { type, data, id } = req.body;

  const medicine = await editMedicineService({
    id,
    data: {
      ...data,
      quantity: data.quantity ? parseInt(data.quantity) : undefined,
    },
    type,
    doneBy: req.user,
  });
  return res.status(200).json({ message: "Medicine updated", medicine });
};

const DeleteInventory = async (req, res) => {
  if (!req.isAuthenticated) throw new Error("Unauthorized");
  if (!req.permissions.includes(permissions.INVENTORY_ADD_MEDICINE)) {
    throw new Error("Unauthorized for this resource");
  }

  const { type, medicineId } = req.body;

  const item = await DeleteInventoryService({
    medicineId,
    type,
    doneBy: req.user,
  });

  return res.status(200).json({
    message: "Medicine deleted",
    item,
  });
};

module.exports = {
  CreateDummyInventory,
  SearchMedicines,
  addMedicine,
  EditInventory,
  DeleteInventory,
};
