const ItemServiceModel = require("../models/item_service_model");

exports.getListItemService = async (req, res) => {
  try {
    const listItemService = await ItemServiceModel.find().populate("idService");

    res.status(200).json(listItemService);
  } catch (err) {
    res.status(500).send("Có lỗi xảy ra");
  }
};
