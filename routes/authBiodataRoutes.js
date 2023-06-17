const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.post("/", controller.authBiodata.authBiodata);
router.get("/login", controller.authBiodata.login);

module.exports = router;
