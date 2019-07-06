const express = require('express');
const router = express.Router();
const authoritiesController = require('../controllers/authorities');
const checkAuth = require('../middleware/check-auth');

/* @POST(/api/rest/v1/calmnet/authorities/register) */
router.post('/register', checkAuth, authoritiesController.authorities_register);

/* @POST(/api/rest/v1/calmnet/authorities/signup) */
router.post('/signup', authoritiesController.authorities_signup);

/* @POST(/api/rest/v1/calmnet/authorities/login) */
router.post('/login', authoritiesController.authorities_login);

/* @PATCH(/api/rest/v1/calmnet/authorities/update) */
router.patch('/update/:government_id', checkAuth, authoritiesController.authorities_update);

module.exports = router;