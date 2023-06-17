const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

// ====== menambahkan foto =======
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

// ================ %% ==================
router.get("/", controller.kampus.getKampus);
router.get("/search", controller.kampus.getSearch);
router.get("/:nim", controller.kampus.getOneKampus);
router.post("/", upload.single("foto"), controller.kampus.postKampus);
router.put("/:nim", controller.kampus.putKampus);
router.delete("/:nim", controller.kampus.deleteKampus);

module.exports = router;
