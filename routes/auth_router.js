const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth_controller')

router.get('/login', AuthController.loginAdmin)

module.exports = router