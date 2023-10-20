const ItemServiceModel = require("../../models/item_service_model");

exports.getListItemService = async (req, res) => {
    try {
        const listItemService = await ItemServiceModel.find().populate("idService");

        res.status(200).json(listItemService);
    } catch (err) {
        res.status(500).send("Có lỗi xảy ra");
        console.log(err)
    }
};

exports.insertItemService = async (req, res) => {
    try {
        const {idService, number, total, image, idOrder} = req.body;

        const itemService = new ItemServiceModel({
            idService: idService, number: number, total: total,
            image: image, idOrder: idOrder
        })

        await itemService.save()

        res.send("Thêm item service thành công")
    } catch (e) {
        res.status(500).send("Có lỗi xảy ra");
        console.log(e)
    }
}