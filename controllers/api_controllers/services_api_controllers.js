const ServiceModel = require("../../models/services_model");

exports.getListService = async (req, res) => {
    try {
        const listServices = await ServiceModel.find()
            .populate('idCategory')
            .populate('attributeList')
            .populate('idStore')
            .populate('idSale')

        res.json(listServices)
    } catch (e) {
        res.status(500).send("Có lỗi xảy ra")
        console.log(e)
    }
}
