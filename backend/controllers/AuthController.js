const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  findUserByEmail,
  createPatient,
  createDoctor
} = require('../models/UserModel');

exports.register = async (req, res) => {
  const { role, name, email, password } = req.body;
  try {
    const existing = await findUserByEmail(role, email);
    if (existing) return res.status(409).json({ error: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    if (role === 'patient') {
      const [firstName, lastName] = name.split(' ');
      await createPatient(firstName, lastName || '', email, hashedPassword);
    } else {
      await createDoctor(name, email, hashedPassword, 'General');
    }

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { role, email, password } = req.body;
  try {
    console.log('Login attempt for:', email, role);

    const user = await findUserByEmail(role, email);
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    console.log('Password match:', match);

    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ token });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: err.message });
  }
};
