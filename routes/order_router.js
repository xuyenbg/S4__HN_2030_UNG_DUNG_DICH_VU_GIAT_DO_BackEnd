var express = require('express');
const { getListOrderModel, getlistOrderByDate } = require('../controllers/order_controler');
var router = express.Router();

router.get('/list',getListOrderModel);
router.get('/listOrderByDate',getlistOrderByDate)


module.exports = router;