const Sequelize = require("sequelize");
const db = require("../database/mysql");

const authBiodata = db.define(
  "auth_biodata",
  {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

authBiodata.removeAttribute("id");
module.exports = authBiodata;
