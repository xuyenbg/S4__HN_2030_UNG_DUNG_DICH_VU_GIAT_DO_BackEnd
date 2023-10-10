var express = require('express')
var router = express.Router()
const AddressController = require('../controllers/address_controler')

router.get("/list", AddressController.getListAddress)

module.exports = router