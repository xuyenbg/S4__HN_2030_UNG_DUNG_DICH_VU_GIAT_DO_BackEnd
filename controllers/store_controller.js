const StoreModel = require("../models/stores_model");

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


