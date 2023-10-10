const UserModel = require('../models/users_model')

exports.getListUser = async (req, res) => {
    try {
        const listUser = await UserModel.find().populate('idRole');

        res.json(listUser);
    } catch (e) {
        console.log(e)
        res.status(500).send("Có lỗi xảy ra")
    }
}