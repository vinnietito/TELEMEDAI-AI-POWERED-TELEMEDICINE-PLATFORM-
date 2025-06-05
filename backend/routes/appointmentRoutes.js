const express = require('express');
const router = express.Router();
const db = require('../config/database');
const verifyToken = require('../middleware/verifyToken');

router.post('/book', verifyToken, async (req, res) => {
  const { doctor_id, appointment_date } = req.body;
  await db.execute(
    'INSERT INTO appointments (patient_id, doctor_id, appointment_date, status) VALUES (?, ?, ?, ?)',
    [req.user.id, doctor_id, appointment_date, 'Scheduled']
  );
  res.json({ message: 'Appointment booked' });
});

router.get('/my', verifyToken, async (req, res) => {
  const [rows] = await db.execute(
    `SELECT a.*, d.name 
     FROM appointments a 
     JOIN doctors d ON a.doctor_id = d.id 
     WHERE a.patient_id = ?`,
    [req.user.id]
  );
  res.json(rows);
});

module.exports = router;
