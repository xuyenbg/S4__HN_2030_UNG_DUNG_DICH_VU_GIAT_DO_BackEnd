var express = require('express')
var router = express.Router()
const AddressApiController = require('../../controllers/api_controllers/address_api_controllers')

router.get("/list", AddressApiController.getListAddress)

module.exports = router