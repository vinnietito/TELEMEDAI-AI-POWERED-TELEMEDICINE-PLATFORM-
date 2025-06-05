const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

router.post('/register', async (req, res) => {
  const { role, name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    if (role === 'patient') {
      await db.execute('INSERT INTO patients (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)', 
        [name.split(' ')[0], name.split(' ')[1], email, hashedPassword]);
    } else {
      await db.execute('INSERT INTO doctors (name, email, password_hash, specialization) VALUES (?, ?, ?, ?)', 
        [name, email, hashedPassword, 'General']);
    }
    res.json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { role, email, password } = req.body;
  let user;
  try {
    const table = role === 'patient' ? 'patients' : 'doctors';
    [user] = await db.execute(`SELECT * FROM ${table} WHERE email = ?`, [email]);

    if (user.length === 0 || !(await bcrypt.compare(password, user[0].password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user[0].id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
