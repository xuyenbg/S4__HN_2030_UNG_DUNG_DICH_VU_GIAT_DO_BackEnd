var express = require('express');
const { getListOrderModel, getlistOrderByDate, getlistOrderByWeek, getListTotalOrder, getlistOrderByMonth, getlistOrderByYear } = require('../controllers/order_controler');
var router = express.Router();

router.get('/list',getListOrderModel);
router.get('/listTotalOrder',getListTotalOrder)
router.get('/listOrderByDate',getlistOrderByDate)
router.get('/listOrderByWeek',getlistOrderByWeek)
router.get('/listOrderByMonth',getlistOrderByMonth)
router.get('/listOrderByYear',getlistOrderByYear)




module.exports = router;