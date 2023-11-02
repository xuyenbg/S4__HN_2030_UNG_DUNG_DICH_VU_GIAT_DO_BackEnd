var express = require('express')
var router = express.Router()
const ServiceApiController = require('../../controllers/api_controllers/services_api_controllers')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

router.get('/list', ServiceApiController.getListService)
router.get('/list-service-by-store/:idStore', ServiceApiController.getServiceByIdStore);
router.get('/list-service-by-category/:idCategory', ServiceApiController.getServiceByIdCategory)
router.get('/list-service-by-store-service', ServiceApiController.getServiceByIdStoreAndIdService);
router.post('/insert', upload.single('image'), ServiceApiController.insertService)
router.get('/seach-service',ServiceApiController.searchServiceByName);

module.exports = router