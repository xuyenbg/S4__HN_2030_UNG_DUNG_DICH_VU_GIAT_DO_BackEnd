const express = require('express');
const router = express.Router();
const StoreApiController = require('../../controllers/api_controllers/stores_api_controllers')

router.get('/list', StoreApiController.getListStore)

module.exports = router