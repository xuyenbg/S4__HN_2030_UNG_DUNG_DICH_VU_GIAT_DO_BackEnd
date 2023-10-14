const AddressModel = require('../../models/address_model')

exports.getListAddress = async (req, res) => {
    try {
        const listAddress = await AddressModel.find().populate({
            path: 'idUser',
            populate: {path: "idRole", model: "RoleModel"}
        })

        res.json(listAddress)
    } catch (e) {
        console.log(e)
        res.status(500).send("Có lỗi xảy ra")
    }
}