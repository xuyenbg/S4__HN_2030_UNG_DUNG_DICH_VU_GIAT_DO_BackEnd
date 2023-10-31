var express = require('express');
const { register } = require("../../controllers/api_controllers/users_api_controllers");
var router = express.Router();


router.post('/', register);
module.exports = router;