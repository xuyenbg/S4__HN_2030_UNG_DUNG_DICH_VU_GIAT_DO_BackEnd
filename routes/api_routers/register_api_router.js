var express = require("express");
const {
  register,
} = require("../../controllers/api_controllers/users_api_controllers");
const multer = require("multer");
var router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("avatar"), register);
module.exports = router;
