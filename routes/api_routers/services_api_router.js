var express = require('express')
var router = express.Router()
const ServiceApiController = require('../../controllers/api_controllers/services_api_controllers')

router.get('/list', ServiceApiController.getListService)

module.exports = router