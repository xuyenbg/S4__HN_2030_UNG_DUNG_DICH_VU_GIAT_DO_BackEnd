const RateModel = require("../../models/rates_model");
const StoreModel = require("../../models/stores_model");
const OrderModel = require("../../models/order_model");

exports.getListRates = async (req, res) => {
  try {
    const list = await RateModel.find().populate("idUser");
    res.status(200).json(list);
  } catch (error) {
    res.status(500).send("Có lỗi xảy ra");
  }
};

exports.getAverageRateByIdStore = async (req, res) => {
  const idStore = req.params.idStore;
  const listRateByIdStore = await RateModel.find({ idStore: idStore });

  var sumRate = 0;
  listRateByIdStore.forEach((item) => {
    sumRate += item.rateNumber;
  });
  if (parseInt(listRateByIdStore.length) == 0) {
    return res.status(200).json(0);
  }
  const averageRate = sumRate / listRateByIdStore.length;
  res.status(200).json(averageRate);
};

exports.addRate = async (req, res) => {
  const { idUser, rateNumber, content, idOrder, idStore } = req.body;
  const objRate = new RateModel({
    idStore: idStore,
    idUser: idUser,
    idOrder: idOrder,
    rateNumber: rateNumber,
    content: content,
  });

  await OrderModel.findByIdAndUpdate(
    { _id: idOrder },
    {
      status: 4,
      updateAt: Date.now(),
    }
  );
  try {
    await objRate.save();
  } catch (error) {
    res.status(500).send("Có lỗi xảy ra");
  }

  const listRateByStore = await RateModel.find({ idStore: idStore });

  var sumRate = 0;
  listRateByStore.forEach((item) => {
    sumRate += item.rateNumber;
  });
  const averageRate = sumRate / listRateByStore.length;

  try {
    await StoreModel.findByIdAndUpdate(
      {
        _id: idStore,
      },
      {
        rate: averageRate.toFixed(1),
      }
    );
  } catch (error) {
    res.status(500).send("Có lỗi xảy ra");
  }
  res.status(200).json("Đánh giá thành công");
};
