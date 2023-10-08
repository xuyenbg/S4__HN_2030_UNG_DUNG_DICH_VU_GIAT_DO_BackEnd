const CategoryModel = require("../models/categories_model");

exports.getListCategory = async (req, res) => {
  try {
    const listCategory = await CategoryModel.find();

    res.status(200).json(listCategory);
  } catch (err) {
    res.status(500).send("Có lỗi xảy ra");
  }
};
