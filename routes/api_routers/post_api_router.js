var express = require('express')
var router = express.Router()
var PostController = require('../../controllers/api_controllers/posts_api_controller')
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

router.get("/list", PostController.listPost);
router.get("/list-post-by-store/:idStore", PostController.listPostByIdStore);
router.post('/insert', upload.single('image'), PostController.insertPost);
router.delete('/delete/:idPost',PostController.deletePost);
router.put('/update/:idPost',upload.single('image'),PostController.updatePost);

module.exports = router