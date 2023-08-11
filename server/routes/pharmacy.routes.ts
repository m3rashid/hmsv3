import express from 'express';

const {
  dispensePrescription,
  getAllPrescriptions,
  getPrescriptionById,
} = require('../controllers');
import { useRoute } from '../utils/errors';
import { checkAuth } from '../middlewares/auth';

const router = express.Router();

router.get('/prescriptions', checkAuth, useRoute(getAllPrescriptions));

router.post('/dispense', checkAuth, useRoute(dispensePrescription));

router.get('/prescriptions/:id', checkAuth, useRoute(getPrescriptionById));

export default router
