var express = require('express')
var router = express.Router()
const StoreController = require('../controllers/store_controller')

router.get('/list', StoreController.getListStore)

module.exports = router