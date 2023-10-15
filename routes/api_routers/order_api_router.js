var express = require('express');
const {getListOrderModel} = require("../../controllers/api_controllers/order_api_controllers");
var router = express.Router();

router.get('/list',getListOrderModel);


module.exports = router;