const express = require('express');
const router = express.Router();
const StoreController = require('../controllers/store_controller')
const checkLogin = require("../middleware/checkLogin");


router.get('/list',checkLogin.reqLogin, StoreController.getListStore)

module.exports = router