const express = require('express');
const { getListSale } = require("../../controllers/api_controllers/sale_api_controllers");
const router = express.Router();

router.get('/list', getListSale);

module.exports = router;