var express = require('express');
var router = express.Router();
const UserApiControllers = require('../../controllers/api_controllers/users_api_controllers')

router.post('/', UserApiControllers.login)

module.exports = router