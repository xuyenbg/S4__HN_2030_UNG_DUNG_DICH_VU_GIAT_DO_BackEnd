const RateModel = require("../../models/rates_model");
const StoreModel = require("../../models/stores_model");
const OrderModel = require("../../models/order_model");

exports.getListRates = async (req, res) => {
  try {
    const list = await RateModel.find()
      .populate("idUser")
      .populate({
        path: "idUser",
        populate: { path: "idRole", model: "RoleModel" },
      })
      .populate({
        path: "idUser",
        populate: { path: "favoriteStores", model: "StoreModel" },
      });
    // .populate("idStore")
    // .populate({
    //   path: "idStore",
    //   populate: { path: "idAddress", model: "AddressModel" },
    // })
    // .populate({
    //   path: "idStore",
    //   populate: { path: "idUser", model: "UserModel" },
    // })
    // .populate({
    //   path: "idUser",
    //   populate: { path: "idRole", model: "RoleModel" },
    // })
    // .populate({
    //   path: "idUser",
    //   populate: { path: "favoriteStores", model: "StoreModel" },
    // });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).send("Có lỗi xảy ra");
    console.log(error);
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
    console.log(error);
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
    console.log(error);
  }
  res.status(200).json("Đánh giá thành công");
};

exports.getRateByIdStore = async (req, res) => {
  try {
    const idStore = req.params.idStore;
    const listRate = await RateModel.find({ idStore: idStore })
      .populate("idUser")
      .populate({
        path: "idUser",
        populate: { path: "idRole", model: "RoleModel" },
      })
      .populate({
        path: "idUser",
        populate: { path: "favoriteStores", model: "StoreModel" },
      });

    // để đây phòng trường hợp phải populate
    // .populate("idStore")
    // .populate({
    //   path: "idStore",
    //   populate: { path: "idAddress", model: "AddressModel" },
    // })
    // .populate({
    //   path: "idStore",
    //   populate: { path: "idUser", model: "UserModel" },
    // })
    // .populate({
    //   path: "idUser",
    //   populate: { path: "idRole", model: "RoleModel" },
    // })
    // .populate({
    //   path: "idUser",
    //   populate: { path: "favoriteStores", model: "StoreModel" },
    // })
    // .populate("idOrder")
    // .populate({
    //   path: "idOrder",
    //   populate: { path: "idUser", model: "UserModel" },
    // });
    res.json(listRate);
  } catch (err) {
    res.status(500).send("Có lỗi xảy ra");
    console.log(err);
  }
};
