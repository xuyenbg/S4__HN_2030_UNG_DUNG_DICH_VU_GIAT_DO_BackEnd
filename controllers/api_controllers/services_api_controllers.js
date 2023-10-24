const ServiceModel = require("../../models/services_model");

exports.getListService = async (req, res) => {
    try {
        const listServices = await ServiceModel.find()
            .populate('idCategory')
            .populate('attributeList')
            .populate('idSale')

        res.json(listServices)
    } catch (e) {
        res.status(500).send("Có lỗi xảy ra")
        console.log(e)
    }
}

exports.getServiceByIdStore = async (req, res) => {
    try {
        const idStore = req.params.idStore
        const listServices = await ServiceModel.find({ idStore: idStore }).populate('idCategory')
            .populate('attributeList')
            .populate('idSale')
        res.json(listServices);
    } catch (err) {
        res.status(500).send("Có lỗi xảy ra")
        console.log(err)
    }
}