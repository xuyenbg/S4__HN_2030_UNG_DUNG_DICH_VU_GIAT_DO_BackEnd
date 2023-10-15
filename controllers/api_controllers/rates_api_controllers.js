const RateModel = require('../../models/rates_model');

exports.getListRates = async (req,res)=>{
    try {
        const list = await RateModel.find().populate('idStore').populate('idService').populate('idUser');
        res.status(200).json(list);
    } catch (error) {
        res.status(500).send("Có lỗi xảy ra");
    }
}