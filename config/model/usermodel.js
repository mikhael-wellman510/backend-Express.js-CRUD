const Sequelize = require("sequelize");
const db = require("../database/mysql");

const usermodel = db.define(
  "users",
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

usermodel.removeAttribute("id");
module.exports = usermodel;
