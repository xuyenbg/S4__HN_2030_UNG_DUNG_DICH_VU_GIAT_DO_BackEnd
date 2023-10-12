var express = require("express");
const { getListNotification } = require("../controllers/notification_controler");
var router = express.Router();


router.get('/list',getListNotification);


module.exports = router;