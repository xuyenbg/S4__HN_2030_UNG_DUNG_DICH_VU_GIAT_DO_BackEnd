const StoreModel = require("../../models/stores_model");
const UserModel = require('../../models/users_model')

exports.getListStore = async (req, res) => {
    try {
        const listStore = await StoreModel.find().populate("idUser").populate("idAddress")

        res.json(listStore)
    } catch (e) {
        console.log(e)
        res.status(500).send("Có lỗi xảy ra")
    }
}

exports.registerStore = async (req, res) => {
    try {
        const { name, rate, idUser, idAddress, status, transportTypeList } = req.body

        const newStore = new StoreModel({
            name: name,
            rate: rate, 
            idUser: idUser, 
            idAddress: idAddress, 
            status: status, 
            transportTypeList: transportTypeList, 
            imageQRCode: req.file == null || req.file == undefined ? null : `/img/${req.file.filename}`
        },)

        await newStore.save().then(async (newStore) => {
            await UserModel.findByIdAndUpdate({ _id: idUser }, {
                idRole: "6522666361b6e95df121642d"
            }).then(() => { res.send("Đăng ký cửa hàng thành công") })
        });

    } catch (err) {
        console.log(err)
        res.status(500).send("Có lỗi xảy ra")
    }
}