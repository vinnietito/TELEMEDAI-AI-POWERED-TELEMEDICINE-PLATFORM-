const db = require('../config/database');

exports.getProfile = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM doctors WHERE id = ?', [req.user.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT a.*, p.first_name, p.last_name
       FROM appointments a
       JOIN patients p ON a.patient_id = p.id
       WHERE a.doctor_id = ?`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
