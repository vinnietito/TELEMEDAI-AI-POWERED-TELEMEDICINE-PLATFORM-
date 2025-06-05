const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const DoctorController = require('../controllers/DoctorController');

router.get('/profile', verifyToken, DoctorController.getProfile);
router.get('/appointments', verifyToken, DoctorController.getAppointments);

module.exports = router;
