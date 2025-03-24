require("dotenv").config();
const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT),
  options: {
    encrypt: false, // Cambiar a true si usas Azure
    trustServerCertificate: true,
  },
};

async function connectDB() {
  try {
    await sql.connect(config);
  } catch (err) {}
}

module.exports = { connectDB, sql };
