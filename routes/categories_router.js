const express = require("express");
const {
  getListCategory,
  renderAddPage,
  insertCategory,
  renderEditPage,
  updateCategory,
} = require("../controllers/categories_controller");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", getListCategory);
router.get("/add", renderAddPage);
router.post("/post", upload.single("image"), insertCategory);
router.get("/edit/:idCate", renderEditPage);
router.post("/update/:idCate", upload.single("image"), updateCategory);

module.exports = router;
