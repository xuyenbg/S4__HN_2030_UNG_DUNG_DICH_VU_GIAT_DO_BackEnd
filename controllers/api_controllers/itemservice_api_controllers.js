const ItemServiceModel = require("../../models/item_service_model");

exports.getListItemService = async (req, res) => {
    try {
        const listItemService = await ItemServiceModel.find()
            .populate("idOrder")
            .populate("idService")
            // .populate({ path: 'idService', populate: { path: 'attributeList', model: "AttributeModel" } })
            // .populate({ path: 'idService', populate: { path: 'idCategory', model: "CategoryModel" } })
            // .populate({ path: 'idService', populate: { path: 'idSale', model: "SaleModel" } })
            // .populate({ path: 'idService', populate: { path: 'idStore', model: "StoreModel" } })

        res.status(200).json(listItemService);
    } catch (err) {
        res.status(500).send("Có lỗi xảy ra");
        console.log(err)
    }
};

exports.insertItemService = async (req, res) => {
    try {
        const { idService, number, total, image, idOrder } = req.body;

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