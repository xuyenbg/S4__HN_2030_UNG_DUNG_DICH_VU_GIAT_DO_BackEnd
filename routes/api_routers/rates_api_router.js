const express = require('express');
const { getListRates } = require("../../controllers/api_controllers/rates_api_controllers");
const router = express.Router();

router.get('/list', getListRates);

module.exports = router;