const AddressModel = require('../../models/address_model')

exports.getListAddress = async (req, res) => {
    try {
        const listAddress = await AddressModel.find().populate({
            path: 'idUser',
            populate: { path: "idRole", model: "RoleModel" }
        })

        res.json(listAddress)
    } catch (e) {
        console.log(e)
        res.status(500).send("Có lỗi xảy ra")
    }
}

exports.updateAddressDefault = (req, res) => {
    try {
        const idAddress = req.params.idAddress
        const idUser = req.query.idUser

        // set tất cả địa chỉ khác với idAddress truyền từ params theo iduser thành false, sau đó update lại địa chỉ đó thành true
        AddressModel.updateMany({ _id: { $ne: idAddress }, idUser: idUser }, { $set: { isDefault: false } })
            .then(() => {
                // Cập nhật địa chỉ được chỉ định thành mặc định (true)
                return AddressModel.findByIdAndUpdate(idAddress, { $set: { isDefault: true } });
            })
            .then(() => {
                res.send('Cập nhật thành công.');
            })
            .catch((error) => {
                res.status(500).send("Lỗi khi cập nhật")
                console.error('Lỗi khi cập nhật:', error);
            });
    } catch (e) {
        console.log(e)
        res.status(500).send("Có lỗi xảy ra")
    }
}

exports.getAddressById = async (req, res) => {
    try {
        const idAddress = req.params.idAddress
        const address = await AddressModel.findById(idAddress).populate('idUser')

        res.json(address)
    } catch (err) {
        console.log(err)
        res.status(500).send("Có lỗi xảy ra")
    }
}

exports.getListAddressByIdUser = async (req, res) => {
    try {
        const idUser = req.params.idUser
        const listAddress = await AddressModel.find({ idUser: idUser }).populate('idUser')

        res.json(listAddress)
    } catch (err) {
        console.log(err)
        res.status(500).send("Có lỗi xảy ra")
    }
}