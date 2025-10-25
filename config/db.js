const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT) || 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

async function connectDB() {
  try {
    console.log("🧠 Connecting to SQL Server...");
    await sql.connect(config);
    console.log('✅ MSSQL Database connected successfully');
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  }
}

module.exports = { sql, connectDB };
