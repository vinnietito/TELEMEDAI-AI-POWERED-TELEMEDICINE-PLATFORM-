const express = require('express');
const router = express.Router();
const db = require('../config/database');
const verifyToken = require('../middleware/verifyToken');

router.get('/profile', verifyToken, async (req, res) => {
  const [rows] = await db.execute('SELECT * FROM doctors WHERE id = ?', [req.user.id]);
  res.json(rows[0]);
});

router.get('/appointments', verifyToken, async (req, res) => {
  const [rows] = await db.execute(
    `SELECT a.*, p.first_name, p.last_name 
     FROM appointments a 
     JOIN patients p ON a.patient_id = p.id 
     WHERE a.doctor_id = ?`,
    [req.user.id]
  );
  res.json(rows);
});

module.exports = router;
