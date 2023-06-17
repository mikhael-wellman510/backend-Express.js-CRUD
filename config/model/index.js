const mahasiswa = require("./mahasiswa");
const biodata = require("./biodata");
const kampus = require("./kampus");
const kantor = require("./kantor");
const usermodel = require("./usermodel");
const authBiodata = require("./auth_biodata");
const tentara = require("./tentara");
const kantorTni = require("./kantor_tentara");
const model = {};

model.mahasiswa = mahasiswa;
model.biodata = biodata;
model.kampus = kampus;
model.kantor = kantor;
model.usermodel = usermodel;
model.authBiodata = authBiodata;
model.tentara = tentara;
model.kantorTni = kantorTni;

module.exports = model;
