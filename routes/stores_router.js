const express = require('express');
const router = express.Router();
const StoreController = require('../controllers/store_controller')

router.get('/list', StoreController.getListStore)

module.exports = router