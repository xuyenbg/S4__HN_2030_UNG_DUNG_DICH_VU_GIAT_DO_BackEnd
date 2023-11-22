const express = require("express");
const router = express.Router();
const StoreApiController = require("../../controllers/api_controllers/stores_api_controllers");
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

router.get("/list", StoreApiController.getListStore);
router.post(
  "/register-store",
  upload.single("imageQRCode"),
  StoreApiController.registerStore
);
router.get("/store-by-iduse/:idUser", StoreApiController.getObjStoreById);
router.get("/search-store", StoreApiController.searchStoreByName);
router.get("/store-by-idstore/:idStore", StoreApiController.getStoreByidStore);
router.put("/update-rate/:idStore", StoreApiController.updateRateStore);
router.put(
  "/update-store/:idStore",
  upload.single("imageQRCode"),
  StoreApiController.updateStore
);
router.get("/list-near-store", StoreApiController.getNearStore);
router.put("/open-close-store/:idStore", StoreApiController.openCloseStore);

module.exports = router;
