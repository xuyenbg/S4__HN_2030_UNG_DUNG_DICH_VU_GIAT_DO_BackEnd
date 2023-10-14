const StoreModel = require("../../models/stores_model");

exports.getListStore = async(req, res) => {
    try {
        const listStore = await StoreModel.find()

        res.json(listStore)
    } catch (e) {
        console.log(e)
        res.status(500).send("Có lỗi xảy ra")
    }
}
