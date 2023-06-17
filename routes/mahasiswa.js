const express = require("express");
const router = express.Router();

const controller = require("../controller/index");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

console.log(storage);
const upload = multer({ storage: storage });

router.get("/", controller.mahasiswa.getAll);

router.get("/:nim", controller.mahasiswa.getOne);

router.post("/", upload.single("foto"), controller.mahasiswa.postMahasiswa);

router.put("/:nim", controller.mahasiswa.putMahasiswa);

router.delete("/:nim", controller.mahasiswa.deleteMahasiswa);

module.exports = router;
