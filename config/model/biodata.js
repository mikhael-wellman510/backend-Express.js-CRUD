const Sequelize = require("sequelize");

const db = require("../database/mysql");
const kantor = require("./kantor");

const biodata = db.define(
  "biodata",
  {
    nip: { type: Sequelize.INTEGER, primaryKey: true },
    nama: Sequelize.STRING,
    alamat: Sequelize.STRING,
    umur: Sequelize.STRING,
    pekerjaan: Sequelize.STRING,
    status: Sequelize.STRING,
    foto: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

biodata.hasOne(kantor, { foreignKey: "pekerjaan" });
biodata.belongsTo(kantor, { foreignKey: "pekerjaan" });

biodata.removeAttribute("id");
module.exports = biodata;
