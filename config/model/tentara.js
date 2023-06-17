const Sequelize = require("sequelize");
const db = require("../database/mysql");
const kantorTni = require("./kantor_tentara");

const tentara = db.define(
  "tentara",
  {
    nip: { type: Sequelize.STRING, primaryKey: true },
    nama: Sequelize.STRING,
    usia: Sequelize.STRING,
    matra: Sequelize.STRING,
    pangkat: Sequelize.STRING,
    foto: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

tentara.hasOne(kantorTni, { foreignKey: "matra" });
tentara.belongsTo(kantorTni, { foreignKey: "matra" });

tentara.removeAttribute("id");
module.exports = tentara;
