const express = require('express');
const router = express.Router();

// Example in-memory storage for testing
let appointments = [];

// Create appointment
router.post('/book', (req, res) => {
  const { surveyType, date, time, location, notes } = req.body;
  if (!surveyType || !date || !time || !location) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newAppointment = { id: appointments.length + 1, surveyType, date, time, location, notes };
  appointments.push(newAppointment);

  res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
});

// Get all appointments
router.get('/', (req, res) => {
  res.json(appointments);
});

module.exports = router;
