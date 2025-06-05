const db = require('../config/database');

const findUserByEmail = async (role, email) => {
  const [rows] = await db.execute(
    `SELECT * FROM ${role === 'patient' ? 'patients' : 'doctors'} WHERE email = ?`,
    [email]
  );
  return rows[0];
};

const createPatient = async (firstName, lastName, email, password) => {
  await db.execute(
    'INSERT INTO patients (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)',
    [firstName, lastName, email, password]
  );
};

const createDoctor = async (name, email, password, specialization) => {
  await db.execute(
    'INSERT INTO doctors (name, email, password_hash, specialization) VALUES (?, ?, ?, ?)',
    [name, email, password, specialization]
  );
};

module.exports = {
  findUserByEmail,
  createPatient,
  createDoctor
};
