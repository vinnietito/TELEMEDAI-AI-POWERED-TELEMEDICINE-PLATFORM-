const db = require('../config/database');

exports.bookAppointment = async (req, res) => {
  const { doctor_id, appointment_date } = req.body;
  try {
    await db.execute(
      'INSERT INTO appointments (patient_id, doctor_id, appointment_date, status) VALUES (?, ?, ?, ?)',
      [req.user.id, doctor_id, appointment_date, 'Scheduled']
    );
    res.json({ message: 'Appointment booked' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyAppointments = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT a.*, d.name AS doctor_name
       FROM appointments a
       JOIN doctors d ON a.doctor_id = d.id
       WHERE a.patient_id = ?`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
