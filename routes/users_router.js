var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user_controller')

router.get('/list', UserController.getListUser);

module.exports = router;
