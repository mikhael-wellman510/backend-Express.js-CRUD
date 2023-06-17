const Sequelize = require("sequelize");
const mysql = require("mysql2");

// ======= wajib pakai karena pakai ENV =====
require("dotenv").config();
// ==========================================

const dbPool = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
  }
);

module.exports = dbPool;
