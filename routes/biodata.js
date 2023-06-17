const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assetsBiodata");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/", controller.biodata.getAllBiodata);
router.get("/search", controller.biodata.getSearchBiodata);
router.get("/:nip", controller.biodata.getOneBiodata);
router.post("/", upload.single("foto"), controller.biodata.postBiodata);
router.put("/:nip", controller.biodata.putBiodata);
router.delete("/:nip", controller.biodata.deleteBiodata);

module.exports = router;
