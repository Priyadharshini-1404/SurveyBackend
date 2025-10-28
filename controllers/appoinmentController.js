const { sql } = require('../config/db');

const bookAppointment = async (req, res) => {
  try {
    const { surveyType, date, time, location, notes } = req.body;

    if (!surveyType || !date || !time || !location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const result = await sql.query`
      INSERT INTO Appointments (SurveyType, Date, Time, Location, Notes)
      VALUES (${surveyType}, ${date}, ${time}, ${location}, ${notes})
    `;

    res.status(200).json({ message: 'Appointment booked successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { bookAppointment };
