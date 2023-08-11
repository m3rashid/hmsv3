import express from 'express';

const { createAppointment, getAppointmentById, createPatient } = require('../controllers');
import { useRoute } from '../utils/errors';
import { checkAuth } from '../middlewares/auth';
import { getAllAppointments } from '../controllers/reception';

const router = express.Router();

router.post('/create-appointment', checkAuth, useRoute(createAppointment));

router.post('/create-patient', checkAuth, useRoute(createPatient));

router.get('/appointment', checkAuth, useRoute(getAppointmentById));

router.get('/appointment/all', checkAuth, useRoute(getAllAppointments));

export default router
