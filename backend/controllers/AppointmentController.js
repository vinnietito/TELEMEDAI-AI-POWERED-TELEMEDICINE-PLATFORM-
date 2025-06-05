const db = require('../config/database');

exports.bookAppointment = async (req, res) => {
  const { doctor_id, appointment_date } = req.body;
  await db.execute(
    'INSERT INTO appointments (patient_id, doctor_id, appointment_date, status) VALUES (?, ?, ?, ?)',
    [req.user.id, doctor_id, appointment_date, 'Scheduled']
  );
  res.json({ message: 'Appointment booked' });
};

exports.getMyAppointments = async (req, res) => {
  const [rows] = await db.execute(
    `SELECT a.*, d.name AS doctor_name
     FROM appointments a
     JOIN doctors d ON a.doctor_id = d.id
     WHERE a.patient_id = ?`,
    [req.user.id]
  );
  res.json(rows);
};
