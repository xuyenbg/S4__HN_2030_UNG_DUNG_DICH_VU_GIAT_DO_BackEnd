var express = require('express');
const {getListOrderModel, insertOrder, updateStatusOrder, updateOrder}
    = require("../../controllers/api_controllers/order_api_controllers");
var router = express.Router();

router.get('/list', getListOrderModel);
router.post('/insert', insertOrder)
router.put('/update-status/:idOrder', updateStatusOrder)
router.put('/update-order/:idOrder', updateOrder)

module.exports = router;