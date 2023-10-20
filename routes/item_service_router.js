var express = require('express');
const { getListItemService } = require('../controllers/itemservice_controler');
var router = express.Router();


router.get('/list',getListItemService);

module.exports = router;