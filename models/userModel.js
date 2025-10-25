const { sql } = require('../config/db');

async function createUser({ name, email, password, role }) {
  const query = `
    INSERT INTO Users (name, email, password, role)
    VALUES (@name, @email, @password, @role)
  `;
  const request = new sql.Request();
  request.input('name', sql.VarChar, name);
  request.input('email', sql.VarChar, email);
  request.input('password', sql.VarChar, password);
  request.input('role', sql.VarChar, role || 'user');
  await request.query(query);
}

async function getUserByEmail(email) {
  const request = new sql.Request();
  request.input('email', sql.VarChar, email);
  const result = await request.query('SELECT * FROM Users WHERE email = @email');
  return result.recordset[0];
}

module.exports = { createUser, getUserByEmail };
