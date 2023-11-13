const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth_controller')
const checkLogin = require('../middleware/checkLogin');

router.get('/login',checkLogin.noReqLogin, AuthController.loginAdmin)
router.post('/login',checkLogin.noReqLogin,AuthController.loginAdmin)


module.exports = router