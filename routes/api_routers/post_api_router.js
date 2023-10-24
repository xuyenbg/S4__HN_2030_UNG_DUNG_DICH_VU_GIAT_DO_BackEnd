var express = require('express')
var router = express.Router()
var PostController = require('../../controllers/api_controllers/posts_api_controller')

router.get("/list", PostController.listPost)
router.get("/list-post-by-store/:idStore", PostController.listPostByIdStore)
router.post('/insert', PostController.insertPost);

module.exports = router