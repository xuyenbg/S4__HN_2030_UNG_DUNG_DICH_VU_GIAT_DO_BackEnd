const SaleModel = require('../models/sale_model');

exports.getListSale = async(req,res)=>{
    try {
        const getListSale = await SaleModel.find();
        res.status(200).json(getListSale);
    } catch (error) {
        res.status(500).send("Có lỗi xảy ra");
    }
}