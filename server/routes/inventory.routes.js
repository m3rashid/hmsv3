const express = require("express");

const {
  CreateDummyInventory,
  addMedicine,
  SearchMedicines,
} = require("../controllers/inventory");
const { checkAuth } = require("../middlewares/auth");

const router = express.Router();

router.post("/dummy", CreateDummyInventory);
router.get("/search", checkAuth, SearchMedicines);
router.post("/add", checkAuth, addMedicine);

module.exports = {
  router,
};
