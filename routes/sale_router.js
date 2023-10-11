const express = require('express');
const router = express.Router();
const SaleCtl = require('../controllers/sale_controller');

router.get('/list',SaleCtl.getListSale);

module.exports = router;