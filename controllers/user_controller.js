const UserModel = require('../models/users_model')

exports.getListUser = async (req, res) => {
    try {
        var listUser = await UserModel.find({idRole:'6522667961b6e95df121642e'}).populate('idRole').populate('favoriteStores');

       res.render('table/table_so_luong_khach_hang',{listUser:listUser})
    } catch (e) {
        console.log(e)
        res.status(500).send("Có lỗi xảy ra")
    }
}