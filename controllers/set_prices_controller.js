const SetPriceModel = require("../models/set_prices_model");

exports.getListSetPrice = async (req, res) => {
  try {
    const listSetPrice = await SetPriceModel.find();

    res.status(200).json(listSetPrice);
  } catch (err) {
    console.log(err);
    res.status(500).send("Có lỗi xảy ra");
  }
};
