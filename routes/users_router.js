var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user_controller')

router.get('/list', UserController.getListUser);
router.get('/user_detail/:idUser',UserController.getUserDetail)

module.exports = router;
