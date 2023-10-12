var express = require('express');
const { getListOrderModel } = require('../controllers/order_controler');
var router = express.Router();

router.get('/list',getListOrderModel);


module.exports = router;