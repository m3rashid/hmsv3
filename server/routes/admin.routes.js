const express = require('express');

const { useRoute } = require('../utils/errors');
const { checkAuth } = require('../middlewares/auth');
const {
  getAllUsers,
  editPermissions,
  updateUser,
  generateHmsReports,
  reportDetails,
  getSinglePatientDetails,
} = require('../controllers');
const { getAppConfig, setAppConfig, resetAppConfig } = require('../controllers/admin');

const router = express.Router();

router.post('/all', checkAuth, useRoute(getAllUsers));

router.post('/edit-permissions', checkAuth, useRoute(editPermissions));

router.post('/update-user', checkAuth, useRoute(updateUser));

router.post('/single-patient-details', checkAuth, useRoute(getSinglePatientDetails));

router.post(
  '/gen-report',
  // checkAuth,
  useRoute(generateHmsReports)
);

router.post(
  '/report-details',
  // checkAuth,
  useRoute(reportDetails)
);

router.get('/config', useRoute(getAppConfig));

router.post('/config', checkAuth, useRoute(setAppConfig));

router.post('/config/reset', checkAuth, useRoute(resetAppConfig));

module.exports = {
  router,
};
