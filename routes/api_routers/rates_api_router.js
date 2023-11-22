const express = require('express');
const { getListRates, getAverageRateByIdStore, addRate } = require("../../controllers/api_controllers/rates_api_controllers");
const router = express.Router();

router.get('/list', getListRates);
router.get('/ratebyidStore/:idStore',getAverageRateByIdStore);
router.put('/addRate',addRate);

module.exports = router;