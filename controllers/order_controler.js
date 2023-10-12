const OrderModel = require("../models/order_model");

exports.getListOrderModel = async (req, res) => {
  try {
    const listOrder = await OrderModel.find().populate('idUser').populate('idStore');

    res.status(200).json(listOrder);
  } catch (err) {
    res.status(500).send("Có lỗi xảy ra");
  }
};
