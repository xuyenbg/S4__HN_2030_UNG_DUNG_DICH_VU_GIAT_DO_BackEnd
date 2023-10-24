var express = require('express')
var router = express.Router()
const multer = require('multer')

// post ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

router.use(upload.single('image'))

router.post('/upload', (req, res) => {
    try {
        if (req.file != null) {
            res.contentType('multipart/form-data').send(`/img/${req.file.filename}`)
        } else {
            res.send("Không có file/ảnh nào được chọn")
            return
        }
    } catch (err) {
        res.status(500).send("Có lỗi xảy ra")
        console.log(err);
    }
})

module.exports = router
