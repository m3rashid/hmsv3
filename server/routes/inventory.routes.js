const express = require("express");

const {
  CreateDummyInventory,
  SearchInventory,
  addMedicine,
} = require("../controllers/inventory");

const router = express.Router();

router.post("/dummy", CreateDummyInventory);
router.get("/search", SearchInventory);
router.post("/add", addMedicine);

module.exports = {
  router,
};
