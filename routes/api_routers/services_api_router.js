var express = require('express')
var router = express.Router()
const ServiceApiController = require('../../controllers/api_controllers/services_api_controllers')

router.get('/list', ServiceApiController.getListService)
router.get('/list-service-by-store/:idStore', ServiceApiController.getServiceByIdStore);
router.get('/get-service-by-store-service/:idService/:idStore',ServiceApiController.getServiceByIdStoreAndIdService);

module.exports = router