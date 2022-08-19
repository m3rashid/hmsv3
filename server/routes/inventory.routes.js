const express = require("express");

const {
  CreateDummyInventory,
  addMedicine,
  SearchMedicines,
  EditInventory,
  DeleteInventory,
} = require("../controllers/inventory");
const { checkAuth } = require("../middlewares/auth");

const router = express.Router();

router.post("/dummy", CreateDummyInventory);
router.get("/search", checkAuth, SearchMedicines);
router.post("/add", checkAuth, addMedicine);
router.post("/edit", checkAuth, EditInventory);
router.post("/delete", checkAuth, DeleteInventory);

module.exports = {
  router,
};
