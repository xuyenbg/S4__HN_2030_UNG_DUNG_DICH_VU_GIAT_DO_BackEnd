const express = require('express');
const router = express.Router();
const StoreApiController = require('../../controllers/api_controllers/stores_api_controllers')
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

router.get('/list', StoreApiController.getListStore)
router.post('/register-store', upload.single('imageQRCode'), StoreApiController.registerStore)

module.exports = router