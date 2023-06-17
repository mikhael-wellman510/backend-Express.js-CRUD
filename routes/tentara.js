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

const upload = multer({ storage: storage });
console.log(upload);

router.get("/", controller.tentara.getDataTentara);
router.get("/:nip", controller.tentara.getOneTentara);
router.post("/", upload.single("foto"), controller.tentara.postTentara);
router.put("/:nip", controller.tentara.putTentara);
router.delete("/:nip", controller.tentara.deleteTentara);

module.exports = router;
