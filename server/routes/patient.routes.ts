import express from 'express';

const { createPatient, deletePatient, getPatientById, searchPatients } = require('../controllers');
import { useRoute } from '../utils/errors';
import { checkAuth } from '../middlewares/auth';

const router = express.Router();

router.post('/create', checkAuth, useRoute(createPatient));

router.get('/search', checkAuth, useRoute(searchPatients));

router.get('/:id', checkAuth, useRoute(getPatientById));

router.delete('/:id', checkAuth, useRoute(deletePatient));

export default router
