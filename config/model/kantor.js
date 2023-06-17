const Sequelize = require("sequelize");

const db = require("../database/mysql");

const kantor = db.define(
  "kantor",
  {
    pekerjaan: { type: Sequelize.STRING, primaryKey: true },
    nama_kantor: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

kantor.removeAttribute("id");
module.exports = kantor;
