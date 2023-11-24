const express = require("express");
const {
  getListRates,
  getAverageRateByIdStore,
  addRate,
  getRateByIdStore,
} = require("../../controllers/api_controllers/rates_api_controllers");
const router = express.Router();

router.get("/list", getListRates);
router.get("/ratebyidStore/:idStore", getAverageRateByIdStore);
router.post("/addRate", addRate);
router.get("/list-by-id-store/:idStore", getRateByIdStore);

module.exports = router;
