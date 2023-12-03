var express = require('express');
const { getListOrderModel, getlistOrderByDate, getlistOrderByWeek, getListTotalOrder, getlistOrderByMonth, getlistOrderByYear } = require('../controllers/order_controler');
var router = express.Router();
const checkLogin = require("../middleware/checkLogin");


router.get('/list',checkLogin.reqLogin,getListOrderModel);
router.get('/listTotalOrder',checkLogin.reqLogin,getListTotalOrder)
router.get('/listOrderByDate',checkLogin.reqLogin,getlistOrderByDate)
router.get('/listOrderByWeek',checkLogin.reqLogin,getlistOrderByWeek)
router.get('/listOrderByMonth',checkLogin.reqLogin,getlistOrderByMonth)
router.get('/listOrderByYear',checkLogin.reqLogin,getlistOrderByYear)




module.exports = router;