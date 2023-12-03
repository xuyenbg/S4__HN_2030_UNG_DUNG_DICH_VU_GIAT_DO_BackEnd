const StoreModel = require("../models/stores_model");
const ServiceModel = require('../models/services_model');

exports.getListStore = async(req, res) => {
    try {
        const listStore = await StoreModel.find().populate("idUser")
        .populate("idAddress")
        // res.status(200).json(listStore);
       res.render("table/table_so_luong_cua_hang",{listStore:listStore})
    } catch (e) {
        console.log(e)
        res.status(500).send("Có lỗi xảy ra")
    }
}

exports.getStoreDetail = async(req,res)=>{
    const objStore = await StoreModel.findOne({_id:req.params.idStore.slice(1)}).populate("idAddress").populate("idUser");
    const listServiceByIdStore = await ServiceModel.find({idStore:objStore._id})
    console.log(objStore);
    res.render('detail/store_detail',{objStore:objStore,listServiceByIdStore:listServiceByIdStore})
}


