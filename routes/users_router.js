var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user_controller')
const checkLogin = require("../middleware/checkLogin");


router.get('/list',checkLogin.reqLogin, UserController.getListUser);

module.exports = router;
