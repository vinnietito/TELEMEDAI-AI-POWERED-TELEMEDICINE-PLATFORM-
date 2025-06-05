const express = require('express');
const router = express.Router();
const db = require('../config/database');
const verifyToken = require('../middleware/verifyToken');

router.get('/profile', verifyToken, async (req, res) => {
  const [rows] = await db.execute('SELECT * FROM patients WHERE id = ?', [req.user.id]);
  res.json(rows[0]);
});

router.put('/profile', verifyToken, async (req, res) => {
  const { first_name, last_name, phone, address } = req.body;
  await db.execute(
    'UPDATE patients SET first_name = ?, last_name = ?, phone = ?, address = ? WHERE id = ?',
    [first_name, last_name, phone, address, req.user.id]
  );
  res.json({ message: 'Updated' });
});

module.exports = router;
