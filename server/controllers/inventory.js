const {
  addDummy,
  searchInventoryService,
  addMedicineService,
  editMedicineService,
  DeleteInventoryService,
} = require("../services/inventory");

const CreateDummyInventory = async (req, res) => {
  const count = req.body.count;

  try {
    for (let i = 0; i < count; i++) await addDummy();

    return res.status(200).json({ message: "Dummy inventory created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message || "Internal Server Error",
      error: err,
    });
  }
};

const SearchMedicines = async (req, res) => {
  const { quantity, name, type } = req.query;

  try {
    const inventory = await searchInventoryService(type, {
      quantity,
      name,
    });
    return res.status(200).json({
      message: `${inventory.length} Inventory found`,
      inventory,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message || "Internal Server Error",
      error: err,
    });
  }
};

const addMedicine = async (req, res) => {
  const { type, data } = req.body;
  try {
    const item = await addMedicineService(type, data);
    return res.status(200).json({ message: "Medicine added", data: item });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message || "Internal Server Error",
      error: err,
    });
  }
};

const EditInventory = async (req, res) => {
  const { type, data, id } = req.body;

  try {
    const medicine = await editMedicineService(
      id,
      {
        ...data,
        quantity: data.quantity ? parseInt(data.quantity) : undefined,
      },
      type
    );
    return res.status(200).json({ message: "Medicine updated", medicine });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message || "Internal Server Error",
      error: err,
    });
  }
};

const DeleteInventory = async (req, res) => {
  const { type, medicineId } = req.body;

  try {
    const item = DeleteInventoryService(medicineId, type);
    return res.status(200).json({ message: "Medicine deleted", item });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message || "Internal Server Error",
      error: err,
    });
  }
};

module.exports = {
  CreateDummyInventory,
  SearchMedicines,
  addMedicine,
  EditInventory,
  DeleteInventory,
};
