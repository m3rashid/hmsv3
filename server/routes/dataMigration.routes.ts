import express from 'express';

import { useRoute } from '../utils/errors';
import { checkAuth } from '../middlewares/auth';
import { handleDataMigration } from '../controllers';
import { upload } from '../utils/upload';

const router = express.Router();

router.post('/', checkAuth, upload.single('data'), useRoute(handleDataMigration));

export default router
