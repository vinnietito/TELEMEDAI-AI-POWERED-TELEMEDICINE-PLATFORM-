const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const AppointmentController = require('../controllers/AppointmentController');

router.post('/book', verifyToken, AppointmentController.bookAppointment);
router.get('/my', verifyToken, AppointmentController.getMyAppointments);

module.exports = router;
