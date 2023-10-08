const express = require('express');
const router = express.Router();
const AttributeCtl = require('../controllers/attribute_controller');

router.get('/',AttributeCtl.getListAttribute);

module.exports = router

