const Sequelize = require("sequelize");
const db = require("../database/mysql");

const kantor_tni = db.define(
  "kantor_tni",
  {
    matra: { type: Sequelize.STRING, primaryKey: true },

    lokasi: Sequelize.STRING,
    lama_dinas: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

kantor_tni.removeAttribute("id");
module.exports = kantor_tni;
