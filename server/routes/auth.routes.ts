import express from 'express';

import { useRoute } from '../utils/errors';
import { checkAuth } from '../middlewares/auth';
const { login, revalidate, signup } = require('../controllers');

const router = express.Router();

router.post('/login', useRoute(login));

router.post('/signup', checkAuth, useRoute(signup));

router.post('/revalidate', useRoute(revalidate));

export default router
