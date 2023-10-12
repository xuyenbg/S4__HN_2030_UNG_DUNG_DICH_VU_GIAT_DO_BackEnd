const express = require('express');
const { getListRates } = require('../controllers/rates_controler');
const router = express.Router();

router.get('/list',getListRates);

module.exports = router;