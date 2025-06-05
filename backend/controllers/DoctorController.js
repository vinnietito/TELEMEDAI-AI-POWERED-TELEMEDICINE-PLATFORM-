const db = require('../config/database');

exports.getProfile = async (req, res) => {
  const [rows] = await db.execute('SELECT * FROM doctors WHERE id = ?', [req.user.id]);
  res.json(rows[0]);
};

exports.getAppointments = async (req, res) => {
  const [rows] = await db.execute(
    `SELECT a.*, p.first_name, p.last_name
     FROM appointments a
     JOIN patients p ON a.patient_id = p.id
     WHERE a.doctor_id = ?`,
    [req.user.id]
  );
  res.json(rows);
};
