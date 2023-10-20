const UserModel = require('../models/users_model')

exports.loginAdmin = async (req, res)  => {
    res.render('login')
}