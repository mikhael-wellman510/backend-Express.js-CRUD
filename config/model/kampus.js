const Sequelize = require(`sequelize`);

const db = require("../database/mysql");

const kampus = db.define(
  "kampus",
  {
    nim: Sequelize.STRING,
    nama: Sequelize.STRING,
    kd_jurusan: Sequelize.STRING,
    alamat: Sequelize.STRING,
    angkatan: Sequelize.STRING,
    foto: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

kampus.removeAttribute("id");
module.exports = kampus;
