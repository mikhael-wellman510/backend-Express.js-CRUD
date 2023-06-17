const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.post("/", controller.auth.register);
router.get("/verifikasi", controller.auth.login);
module.exports = router;
