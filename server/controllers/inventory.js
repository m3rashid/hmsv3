const {
  addDummy,
  searchInventoryService,
  addMedicineService,
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
  const { quantity, price, name } = req.query;

  try {
    const inventory = await searchInventoryService({ quantity, price, name });
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
  const { name, quantity, price, description } = req.body;
  try {
    await addMedicineService(name, quantity, price, description);
    return res.status(200).json({ message: "Medicine added" });
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
};
