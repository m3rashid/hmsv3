const express = require("express");

const {
  CreateDummyInventory,
  addMedicine,
  SearchMedicines,
} = require("../controllers/inventory");
const permissions = require("../utils/auth.helpers");
const { checkAuth, checkRouteAccess } = require("../middlewares/auth");

const router = express.Router();

router.post("/dummy", CreateDummyInventory);
router.get(
  "/search",
  checkAuth,
  checkRouteAccess(permissions.SEARCH_MEDICINES),
  SearchMedicines
);
router.post(
  "/add",
  checkAuth,
  checkRouteAccess(permissions.ADD_MEDICINE),
  addMedicine
);

module.exports = {
  router,
};
