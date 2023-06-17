const mahasiswa = require("./mahasiswa");
const biodata = require("./biodata");
const kampus = require("./kampus");
const auth = require("./auth");
const authBiodata = require("./authBiodata");
const tentara = require("./tentara");
const controller = {};

controller.mahasiswa = mahasiswa;
controller.biodata = biodata;
controller.kampus = kampus;
controller.auth = auth;
controller.authBiodata = authBiodata;
controller.tentara = tentara;

module.exports = controller;
