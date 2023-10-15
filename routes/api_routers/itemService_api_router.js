var express = require('express');
const {getListItemService} = require("../../controllers/api_controllers/itemservice_api_controllers");
var router = express.Router();


router.get('/list',getListItemService);

module.exports = router;