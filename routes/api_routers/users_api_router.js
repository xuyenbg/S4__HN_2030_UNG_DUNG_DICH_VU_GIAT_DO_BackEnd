var express = require("express");
var router = express.Router();
const multer = require("multer");
const UserApiControllers = require("../../controllers/api_controllers/users_api_controllers");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.get("/list", UserApiControllers.getListUser);
router.put(
  "/update/:idUser",
  upload.single("avatar"),
  UserApiControllers.updateUser
);

router.put("/add-fav-store/:idUser", UserApiControllers.addFavouriteStore);
router.put(
  "/remove-fav-store/:idUser",
  UserApiControllers.removeFavouriteStore
);
router.get("/details/:idUser", UserApiControllers.getDetailsUser);

module.exports = router;
