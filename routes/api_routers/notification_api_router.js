var express = require("express");
const { getListNotification } = require("../../controllers/api_controllers/notification_api_controller");
var router = express.Router();


router.get('/list', getListNotification);


module.exports = router;