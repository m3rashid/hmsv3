import express from 'express';

const {
  CreateDummyInventory,
  addMedicine,
  SearchMedicines,
  EditInventory,
  DeleteInventory,
} = require('../controllers');
import { useRoute } from '../utils/errors';
import { checkAuth } from '../middlewares/auth';

const router = express.Router();

router.post('/dummy', useRoute(CreateDummyInventory));

router.get('/search', checkAuth, useRoute(SearchMedicines));

router.post('/add', checkAuth, useRoute(addMedicine));

router.post('/edit', checkAuth, useRoute(EditInventory));

router.post('/delete', checkAuth, useRoute(DeleteInventory));

export default router
