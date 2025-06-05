const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const PatientController = require('../controllers/PatientController');

router.get('/profile', verifyToken, PatientController.getProfile);
router.put('/profile', verifyToken, PatientController.updateProfile);

module.exports = router;
