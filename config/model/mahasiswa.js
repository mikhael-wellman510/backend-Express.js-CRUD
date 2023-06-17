const Sequelize = require("sequelize");

const dbPool = require("../database/mysql");

const mahasiswa = dbPool.define(
  "mahasiswa",
  {
    nim: Sequelize.STRING,
    nama: Sequelize.STRING,
    jurusan: Sequelize.STRING,
    foto: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

mahasiswa.removeAttribute("id");
module.exports = mahasiswa;
