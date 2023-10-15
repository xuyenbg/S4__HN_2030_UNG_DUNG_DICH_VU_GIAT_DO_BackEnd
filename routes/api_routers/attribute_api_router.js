var express = require('express');
const {getListAttribute} = require("../../controllers/api_controllers/attribute_controllers");
var router = express.Router();


router.get('/list',getListAttribute);


module.exports = router;