const AttributeModel = require("../models/attribute_model");

exports.getListAttribute = async (req, res) => {
  try {
    const listAttribute = await AttributeModel.find();
    res.status(200).json(listAttribute);
  } catch (error) {
    res.status(500).send("Có lỗi xảy ra");
  }
};
