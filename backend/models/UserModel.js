const db = require('../config/database');

exports.findUserByEmail = async (role, email) => {
  const table = role === 'patient' ? 'patients' : 'doctors';
  const [rows] = await db.execute(`SELECT * FROM ${table} WHERE email = ?`, [email]);
  return rows[0];
};

exports.createPatient = async (firstName, lastName, email, passwordHash) => {
  await db.execute(
    'INSERT INTO patients (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)',
    [firstName, lastName, email, passwordHash]
  );
};

exports.createDoctor = async (name, email, passwordHash, specialization) => {
  await db.execute(
    'INSERT INTO doctors (name, email, password_hash, specialization) VALUES (?, ?, ?, ?)',
    [name, email, passwordHash, specialization]
  );
};
