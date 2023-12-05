const OrderModel = require("../../models/order_model");
const NotificationModel = require("../../models/notification_model");
const StoreModel = require("../../models/stores_model");
const admin = require("firebase-admin");
const moment = require("moment");

const sendNotification = (title, body, idUser, idOrder) => {
  try {
    const payload = {
      notification: {
        title: title,
        body: body,
      },
    };

    admin
      .messaging()
      .sendToTopic(idUser, payload)
      .then(async (response) => {
        console.log("Id Notification:", response);
        const newNotification = new NotificationModel({
          idUser: idUser,
          title: title,
          body: body,
          createAt: Date.now(),
          idOrder: idOrder,
        });

        await newNotification.save();
      });
  } catch (err) {
    console.log(err);
  }
};

exports.getListOrderModel = async (req, res) => {
  try {
    const listOrder = await OrderModel.find()
      .populate("idUser")
      .populate("idStore")
      .populate("idAddress")
      .populate("listItem.idService")
      .populate("listItem.idService.attributeList._id")
      .populate("listItem.attributeList")
      .populate({
        path: "idStore",
        populate: {
          path: "idUser",
          model: "UserModel",
        },
      })
      .populate({
        path: "idStore",
        populate: {
          path: "idAddress",
          model: "AddressModel",
        },
      });

    res.status(200).json(listOrder);
  } catch (err) {
    res.status(500).send("Có lỗi xảy ra");
    console.log(err);
  }
};

exports.insertOrder = async (req, res) => {
  try {
    const {
      idUser,
      idStore,
      total,
      note,
      transportType,
      methodPaymentType,
      feeDelivery,
      status,
      idAddress,
      isPaid,
      listItem,
    } = req.body;

    if (idUser.length === 0) {
      res.status(400).send("Vui lòng không để trống id người đặt");
      return;
    }

    if (idStore.length === 0) {
      res.status(400).send("Vui lòng không để trống id cửa hàng");
      return;
    }

    if (total.length === 0) {
      res.status(400).send("Vui lòng không để trống tổng tiền đơn hàng");
      return;
    }

    if (isNaN(total) === true) {
      res.status(400).send("Vui lòng nhập tổng tiền đơn hàng là số");
      return;
    }

    if (transportType.length === 0) {
      res.status(400).send("Vui lòng không để trống phương thức giao hàng");
      return;
    }

    if (methodPaymentType.length === 0) {
      res.status(400).send("Vui lòng không để trống phương thức thanh toán");
      return;
    }

    if (feeDelivery.length === 0) {
      res.status(400).send("Vui lòng không để trống phí vận chuyển");
      return;
    }

    if (isNaN(feeDelivery) === true) {
      res.status(400).send("Vui lòng nhập phí vận chuyển là số");
      return;
    }

    if (status.length === 0) {
      res.status(400).send("Vui lòng không để trống trạng thái đơn hàng");
      return;
    }

    if (isNaN(status) === true) {
      res.status(400).send("Vui lòng nhập trạng thái đơn hàng là số");
      return;
    }

    if (idAddress.length === 0) {
      res.status(400).send("Vui lòng không để trống id địa chỉ cửa hàng");
      return;
    }

    if (isPaid.length === 0) {
      res
        .status(400)
        .send("Vui lòng không để trống trạng thái thanh toán đơn hàng");
      return;
    }

    const order = new OrderModel({
      idUser: idUser,
      idStore: idStore,
      total: total,
      note: note,
      transportType: transportType,
      methodPaymentType: methodPaymentType,
      feeDelivery: feeDelivery,
      status: status,
      idAddress: idAddress,
      isPaid: isPaid,
      listItem: listItem,
      createAt: Date.now(),
      updateAt: Date.now(),
    });

    const store = await StoreModel.findById({ _id: idStore });

    // let title, body;

    // switch(status) {
    //   case 0:
    //     title = "Thông báo đơn hàng"
    //     body = "Có đơn hàng mới"
    //     break;
    // }

    await order.save().then((newOrder) => {
      sendNotification(
        "Thông báo đơn hàng",
        "Có đơn hàng mới",
        store.idUser.toString(),
        newOrder._id
      );

      res.send("Tạo đơn hàng thành công");
    });
  } catch (e) {
    res.status(500).send("Có lỗi xảy ra");
    console.log(e);
  }
};

exports.updateStatusOrder = async (req, res) => {
  try {
    const idOrder = req.params.idOrder;
    const status = req.body.status;

    if (status.length === 0) {
      res.status(400).send("Vui lòng không để trống trạng thái đơn hàng");
      return;
    }

    if (isNaN(status) === true) {
      res.status(400).send("Vui lòng nhập trạng thái đơn hàng là số");
      return;
    }

    await OrderModel.findByIdAndUpdate(
      { _id: idOrder },
      {
        status: status,
        updateAt: Date.now(),
      }
    ).then((newOrder) => {
      sendNotification(
        "Thông báo đơn hàng",
        "Trạng thái của đơn hàng đã được cập nhật",
        idUser,
        idOrder
      );

      res.send("Cập nhật trạng thái đơn hàng thành công");
    });
  } catch (e) {
    res.status(500).send(`Có lỗi xảy ra ${e}`);
    console.log(e);
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const idOrder = req.params.idOrder;
    const {
      idUser,
      idStore,
      total,
      note,
      transportType,
      methodPaymentType,
      feeDelivery,
      status,
      idAddress,
      isPaid,
      listItem,
    } = req.body;

    if (idUser.length === 0) {
      res.status(400).send("Vui lòng không để trống id người đặt");
      return;
    }

    if (idStore.length === 0) {
      res.status(400).send("Vui lòng không để trống id cửa hàng");
      return;
    }

    if (total.length === 0) {
      res.status(400).send("Vui lòng không để trống tổng tiền đơn hàng");
      return;
    }

    if (isNaN(total) === true) {
      res.status(400).send("Vui lòng nhập tổng tiền đơn hàng là số");
      return;
    }

    if (transportType.length === 0) {
      res.status(400).send("Vui lòng không để trống phương thức giao hàng");
      return;
    }

    if (methodPaymentType.length === 0) {
      res.status(400).send("Vui lòng không để trống phương thức thanh toán");
      return;
    }

    if (feeDelivery.length === 0) {
      res.status(400).send("Vui lòng không để trống phí vận chuyển");
      return;
    }

    if (isNaN(feeDelivery) === true) {
      res.status(400).send("Vui lòng nhập phí vận chuyển là số");
      return;
    }

    if (status.length === 0) {
      res.status(400).send("Vui lòng không để trống trạng thái đơn hàng");
      return;
    }

    if (isNaN(status) === true) {
      res.status(400).send("Vui lòng nhập trạng thái đơn hàng là số");
      return;
    }

    if (idAddress.length === 0) {
      res.status(400).send("Vui lòng không để trống id địa chỉ cửa hàng");
      return;
    }

    if (isPaid.length === 0) {
      res
        .status(400)
        .send("Vui lòng không để trống trạng thái thanh toán đơn hàng");
      return;
    }

    await OrderModel.findByIdAndUpdate(
      {
        _id: idOrder,
      },
      {
        idUser: idUser,
        idStore: idStore,
        total: total,
        note: note,
        transportType: transportType,
        methodPaymentType: methodPaymentType,
        feeDelivery: feeDelivery,
        status: status,
        idAddress: idAddress,
        isPaid: isPaid,
        listItem: listItem,
        updateAt: Date.now(),
      }
    ).then((newOrder) => {
      sendNotification(
        "Thông báo đơn hàng",
        "Cập nhật thông tin đơn hàng thành công",
        idUser,
        idOrder
      );

      res.send("Cập nhật thông tin đơn hàng thành công");
    });
  } catch (e) {
    res.status(500).send(`Có lỗi xảy ra ${e}`);
    console.log(e);
  }
};

exports.getOrderDetail = async (req, res) => {
  const idOrder = req.params.idOrder;
  try {
    const listOrder = await OrderModel.findOne({ _id: idOrder })
      .populate("idUser")
      .populate("idStore")
      .populate("idAddress")
      .populate("listItem.idService")
      .populate("listItem.idService.attributeList._id")
      .populate("listItem.attributeList")
      .populate({
        path: "idStore",
        populate: {
          path: "idUser",
          model: "UserModel",
        },
      })
      .populate({
        path: "idStore",
        populate: {
          path: "idAddress",
          model: "AddressModel",
        },
      });

    res.status(200).json(listOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send("Có lỗi xảy ra");
  }
};

exports.getListOrderByIdUser = async (req, res) => {
  const idUser = req.params.idUser;
  const sortOrder = req.query.sortOrder;
  const sortOption =
    sortOrder === "desc" ? { createAt: "desc" } : { createAt: "asc" };
  try {
    const listOrder = await OrderModel.find({ idUser: idUser })
      .sort(sortOption)
      .populate("idUser")
      .populate("idStore")
      .populate("idAddress")
      .populate("listItem.idService")
      .populate("listItem.idService.attributeList._id")
      .populate("listItem.attributeList")
      .populate({
        path: "idStore",
        populate: {
          path: "idUser",
          model: "UserModel",
        },
      })
      .populate({
        path: "idStore",
        populate: {
          path: "idAddress",
          model: "AddressModel",
        },
      });

    res.status(200).json(listOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send("Có lỗi xảy ra");
  }
};

exports.getListOrderByIdStoreAndIdUser = async (req, res) => {
  const idStore = req.params.idStore;
  const idUser = req.params.idUser;
  const sortOrder = req.query.sortOrder;

  const sortOption =
    sortOrder === "desc" ? { createAt: "desc" } : { createAt: "asc" };
  try {
    const listOrder = await OrderModel.find({
      idStore: idStore,
      idUser: idUser,
    })
      .sort(sortOption)
      .populate("idUser")
      .populate("idStore")
      .populate("idAddress")
      .populate("listItem.idService")
      .populate("listItem.idService.attributeList._id")
      .populate("listItem.attributeList")
      .populate({
        path: "idStore",
        populate: {
          path: "idUser",
          model: "UserModel",
        },
      })
      .populate({
        path: "idStore",
        populate: {
          path: "idAddress",
          model: "AddressModel",
        },
      });

    res.status(200).json(listOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send("Có lỗi xảy ra");
  }
};

exports.getListOrderByIdStore = async (req, res) => {
  const idStore = req.params.idStore;
  const sortOrder = req.query.sortOrder;

  const sortOption =
    sortOrder === "desc" ? { createAt: "desc" } : { createAt: "asc" };
  try {
    const listOrder = await OrderModel.find({ idStore: idStore })
      .sort(sortOption)
      .populate("idUser")
      .populate("idStore")
      .populate("idAddress")
      .populate("listItem.idService")
      .populate("listItem.idService.attributeList._id")
      .populate("listItem.attributeList")
      .populate({
        path: "idStore",
        populate: {
          path: "idUser",
          model: "UserModel",
        },
      })
      .populate({
        path: "idStore",
        populate: {
          path: "idAddress",
          model: "AddressModel",
        },
      });

    res.status(200).json(listOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send("Có lỗi xảy ra");
  }
};

exports.getListOrderByStatusAndStoreAndUser = async (req, res) => {
  const status = req.params.status;
  const idStore = req.params.idStore;
  const idUser = req.params.idUser;
  const sortOrder = req.query.sortOrder;
  const sortOption =
    sortOrder === "desc" ? { createAt: "desc" } : { createAt: "asc" };
  try {
    const listOrder = await OrderModel.find({
      status: status,
      idStore: idStore,
      idUser: idUser,
    })
      .sort(sortOption)
      .populate("idUser")
      .populate("idStore")
      .populate("idAddress")
      .populate("listItem.idService")
      .populate("listItem.idService.attributeList._id")
      .populate("listItem.attributeList")
      .populate({
        path: "idStore",
        populate: {
          path: "idUser",
          model: "UserModel",
        },
      })
      .populate({
        path: "idStore",
        populate: {
          path: "idAddress",
          model: "AddressModel",
        },
      });

    res.status(200).json(listOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send("Có lỗi xảy ra");
  }
};

exports.getListOrderByStatusAndUser = async (req, res) => {
  const status = req.params.status;
  const idUser = req.params.idUser;
  const sortOrder = req.query.sortOrder;
  const sortOption =
    sortOrder === "desc" ? { createAt: "desc" } : { createAt: "asc" };
  try {
    const listOrder = await OrderModel.find({
      status: status,
      idUser: idUser,
    })
      .sort(sortOption)
      .populate("idUser")
      .populate("idStore")
      .populate("idAddress")
      .populate("listItem.idService")
      .populate("listItem.idService.attributeList._id")
      .populate("listItem.attributeList")
      .populate({
        path: "idStore",
        populate: {
          path: "idUser",
          model: "UserModel",
        },
      })
      .populate({
        path: "idStore",
        populate: {
          path: "idAddress",
          model: "AddressModel",
        },
      });

    res.status(200).json(listOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send("Có lỗi xảy ra");
  }
};

exports.getListOrderTodayByIdStore = async (req, res) => {
  try {
    const status = req.query.status;
    const idStore = req.params.idStore;
    const sortOrder = req.query.sortOrder;
    const sortOption = sortOrder == "desc" ? "desc" : "asc";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const listOrder = await OrderModel.find({
      idStore: idStore,
      status: status,
      createAt: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    })
      .sort({ createAt: sortOption })
      .populate("idUser")
      .populate("idStore")
      .populate("idAddress")
      .populate("listItem.idService")
      .populate("listItem.idService.attributeList._id")
      .populate("listItem.attributeList")
      .populate({
        path: "idStore",
        populate: {
          path: "idUser",
          model: "UserModel",
        },
      })
      .populate({
        path: "idStore",
        populate: {
          path: "idAddress",
          model: "AddressModel",
        },
      });

    res.json(listOrder);
  } catch (err) {
    res.status(500).send("Có lỗi xảy ra");
    console.log(err);
  }
};

exports.getListOrderByDateAndStatus = async (req, res) => {
  try {
    const idStore = req.params.idStore;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const status = req.query.status;

    const listOrder = await OrderModel.find({
      idStore: idStore,
      createAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
      status: status,
    })
      .sort({ createAt: -1 })
      .populate("idUser")
      .populate("idStore")
      .populate("idAddress")
      .populate("listItem.idService")
      .populate("listItem.idService.attributeList._id")
      .populate("listItem.attributeList")
      .populate({
        path: "idStore",
        populate: {
          path: "idUser",
          model: "UserModel",
        },
      })
      .populate({
        path: "idStore",
        populate: {
          path: "idAddress",
          model: "AddressModel",
        },
      });

    res.json(listOrder);
  } catch (err) {
    res.status(500).send("Có lỗi xảy ra");
    console.log(err);
  }
};

exports.getTotalOrderByDay = async (req, res) => {
  const currentDate = moment().format("YYYY-MM-DD");
  const listOrder = await OrderModel.find({
    idStore: req.params.idStore,
    status: { $in: [3, 4] },
  })
    .populate("idUser")
    .populate("idStore")
    .populate("idAddress")
    .populate("listItem.idService")
    .populate("listItem.idService.attributeList._id")
    .populate("listItem.attributeList")
    .populate({
      path: "idStore",
      populate: {
        path: "idUser",
        model: "UserModel",
      },
    })
    .populate({
      path: "idStore",
      populate: {
        path: "idAddress",
        model: "AddressModel",
      },
    });

  var total = 0;
  var list = [];
  listOrder.forEach((item) => {
    const timestamp = new Date(item.createAt);
    const year = timestamp.getUTCFullYear();
    const month = timestamp.getUTCMonth() + 1;
    const day = timestamp.getUTCDate();
    const date = year + "-" + month + "-" + day;
    if (date == currentDate) {
      console.log(item.createAt);
      total += item.total;
      list.push(item);
    }
  });
  res.status(200).json({ total: total, totalOrder: list.length });
};

exports.getTotalByWeekMonth = async (req, res) => {
  try {
    const month = parseInt(req.query.month);
    const week = parseInt(req.query.week);
    const idStore = req.params.idStore;

    let startDate, endDate;

    if (!isNaN(week)) {
      const today = moment();
      const currentYear = today.year();
      const currentMonth = today.month() + 1;

      const firstDayOfMonth = moment(
        `${currentYear}-${currentMonth}-02`,
        "YYYY-MM-DD"
      );
      const startOfWeek = firstDayOfMonth.clone().add(week - 1, "weeks");
      const endOfWeek = startOfWeek.clone().add(5, "days").endOf("day");

      startDate = startOfWeek.startOf("day").toDate();
      endDate = endOfWeek.endOf("day").toDate();
    } else if (!isNaN(month)) {
      const today = moment();
      const currentYear = today.year();
      startDate = moment(`${currentYear}-${month}-02`, "YYYY-MM-DD")
        .startOf("day")
        .toDate();
      endDate = moment(`${currentYear}-${month}-02`, "YYYY-MM-DD")
        .endOf("month")
        .endOf("day")
        .toDate();
    } else {
      // return res.status(404).send("Not Found");
      const today = moment();
      const startOfWeek = today.clone().startOf("week");
      const endOfWeek = today.clone().endOf("week");

      startDate = startOfWeek.toDate();
      endDate = endOfWeek.toDate();
    }

    console.log(startDate);
    console.log(endDate);

    const orders = await OrderModel.find({
      idStore: idStore,
      createAt: { $gte: startDate, $lt: endDate },
      status: { $in: [3, 4] },
    });

    const totalAmount = orders.reduce((sum, order) => sum + order.total, 0);

    res.json({ total: totalAmount, totalOrder: orders.length });
  } catch (err) {
    res.status(500).send("Có lỗi xảy ra");
    console.log(err);
  }
};
