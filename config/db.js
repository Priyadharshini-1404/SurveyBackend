// backend/config/db.js
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

let pool; // store a single connection pool

async function connectDB() {
  try {
    if (!pool) {
      console.log("🧠 Connecting to SQL Server...");
      pool = await sql.connect(config);
      console.log('✅ MSSQL Database connected successfully');
    }
    return pool; // ✅ return pool here
  } catch (err) {
    console.error('❌ Database connection failed:', err);
    throw err; // so caller knows connection failed
  }
}

module.exports = { sql, connectDB };
