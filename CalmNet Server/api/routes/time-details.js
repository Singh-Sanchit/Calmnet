const express = require('express');
const router = express.Router();
const timeDetailsController = require('../controllers/time-details');
const checkAuth = require('../middleware/check-auth');

/* @GET(/api/rest/v1/calmnet/time-details/all) */
router.get('/all', checkAuth, timeDetailsController.time_details_getAllRecords);

/* @POST(/api/rest/v1/calmnet/time-details/add) */
router.post('/add', checkAuth, timeDetailsController.time_details_addRecords);

/* @POST(/api/rest/v1/calmnet/time-details) */
router.post('/getbydate', checkAuth, timeDetailsController.time_details_getRecordByDate);

module.exports = router;