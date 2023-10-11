var express = require('express')
var router = express.Router()
const ServiceController = require('../controllers/services_controller')

router.get('/list', ServiceController.getListService)

module.exports = router