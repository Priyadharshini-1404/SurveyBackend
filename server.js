const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appoinmentRoutes');
const surveyRoutes = require('./routes/surveyRoutes');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
console.log(process.env.DB_SERVER);

app.use('/api/auth', authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use('/api/surveys', surveyRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
