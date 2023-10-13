const UserModel = require('../../models/users_model')

exports.getListUser = async (req, res) => {
    try {
        const listUser = await UserModel.find().populate('idRole').populate('favoriteStores');

        res.json(listUser);
    } catch (e) {
        console.log(e)
        res.status(500).send("Có lỗi xảy ra")
    }
}

exports.login = async (req, res) => {
    var user = {
        phone: req.body.phone,
        passwd: req.body.userId
    }

    const checkExistUser = await UserModel.findOne({phone: user.phone})
    if (checkExistUser != null) {
        if (user.passwd === checkExistUser.passwd) {
            res.status(200).json({
                message: "Đăng nhập thành công",
                user: checkExistUser
            })
        } else {
            res.status(401).send("Mật khẩu không đúng")
        }
    } else {
        res.status(401).send("Tài khoản không tồn tại")
    }
}