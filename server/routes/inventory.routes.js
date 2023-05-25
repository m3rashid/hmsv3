const express = require('express');

const {
  CreateDummyInventory,
  addMedicine,
  SearchMedicines,
  EditInventory,
  DeleteInventory,
} = require('../controllers');
const { useRoute } = require('../utils/errors');
const { checkAuth } = require('../middlewares/auth');

const router = express.Router();

router.post('/dummy', useRoute(CreateDummyInventory));

router.get('/search', checkAuth, useRoute(SearchMedicines));

router.post('/add', checkAuth, useRoute(addMedicine));

router.post('/edit', checkAuth, useRoute(EditInventory));

router.post('/delete', checkAuth, useRoute(DeleteInventory));

module.exports = {
  router,
};
