const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stations');
const checkAuth = require('../middleware/check-auth');

/* @GET(/api/rest/v1/calmnet/stations/all) */
router.get('/all', checkAuth, stationController.station_getAllRecords);

/* @POST(/api/rest/v1/calmnet/stations/add) */
router.post('/add', checkAuth, stationController.station_addRecord);

/* @GET(/api/rest/v1/calmnet/stations/{station_id}) */
router.get('/:station_id', checkAuth, stationController.station_getRecordById);

module.exports = router;