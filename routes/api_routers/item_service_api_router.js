var express = require('express');
const {getListItemService, insertItemService} = require("../../controllers/api_controllers/itemservice_api_controllers");
var router = express.Router();

router.get('/list',getListItemService);
router.post("/insert", insertItemService)

module.exports = router;