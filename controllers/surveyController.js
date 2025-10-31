const { sql } = require("../config/db");

exports.createSurveyRequest = async (req, res) => {
  try {
    const { name, surveyType, location, surveyDate, contact } = req.body;

    if (!name || !surveyType || !location || !surveyDate || !contact) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    await sql.query`
      INSERT INTO SurveyRequests (Name, SurveyType, Location, SurveyDate, Contact)
      VALUES (${name}, ${surveyType}, ${location}, ${surveyDate}, ${contact})
    `;

    res.status(201).json({ message: "Survey request submitted successfully!" });
  } catch (error) {
    console.error("Survey request error:", error);
    res.status(500).json({ message: "Server error while saving survey request" });
  }
};

exports.getAllSurveys = async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM SurveyRequests ORDER BY Id DESC`;
    res.json(result.recordset);
  } catch (error) {
    console.error("Get surveys error:", error);
    res.status(500).json({ message: "Server error while fetching survey requests" });
  }
};
  