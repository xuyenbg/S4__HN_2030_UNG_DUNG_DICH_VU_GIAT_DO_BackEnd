const OrderModel = require("../models/order_model");

const moment = require("moment");

exports.getListOrderModel = async (req, res) => {
  try {
    const listOrder = await OrderModel.find({ status: { $in: [3, 4] } })
      .populate("idUser")
      .populate("idStore");
    const listMerge = new Set(listOrder.map((item) => item["idStore"]));
    var list = [];

    for (const item of listMerge) {
      const listOrderByIdStore = await OrderModel.find({
        idStore: item._id,
        status: { $in: [3, 4] },
      });
      const objOrderByIdStore = await OrderModel.findOne({ idStore: item._id })
        .populate("idUser")
        .populate("idStore");
      let total = 0;
      listOrderByIdStore.forEach((item) => {
        total += item.total;
      });
      objOrderByIdStore["countOrder"] = listOrderByIdStore.length;
      objOrderByIdStore.total = total;
      list.push(objOrderByIdStore);
      total = 0;
    }
    console.log(list.length);

    res.render("table/table_tong_doanh_thu_cua_hang", {
      listOrder: list,
    });
  } catch (err) {
    res.status(500).send("Có lỗi xảy ra");
  }
};

exports.getlistOrderByDate = async (req, res) => {
  const listOrderByDate = await OrderModel.find({ status: { $in: [3, 4] } })
    .populate("idUser")
    .populate("idStore");
  const currentDate = moment().format("YYYY-MM-DD");
  var totalCurrentDate = 0;
  var list = [];
  for (let index = 0; index < listOrderByDate.length; index++) {
    const formatDate = moment(listOrderByDate[index].createAt).format(
      "YYYY-MM-DD"
    );
    if (formatDate === currentDate) {
      totalCurrentDate += listOrderByDate[index].total;
      list.push(listOrderByDate[index]);
    }
  }

  const currentDateFormat = moment().format("DD-MM-YYYY")

  res.render("table/table_tong_don_hang_theo_ngay", { list: list,currentDate:currentDateFormat});
};

exports.getlistOrderByWeek = async (req, res) => {
  const current = moment();
  const currentDayOfWeek = current.day();
  const firstDayOfWeek = current.clone().startOf("week");

  const daysOfWeekFormatted = [];

  for (let i = 0; i < 7; i++) {
    const day = firstDayOfWeek.clone().add(i, "days");
    const formattedDay = day.format("YYYY-MM-DD");
    daysOfWeekFormatted.push(formattedDay);
  }

  const listOrdersByWeek = await OrderModel.find({
    createAt: { $gte: daysOfWeekFormatted[0], $lt: daysOfWeekFormatted[6] },
    status: { $in: [3, 4] },
  })
    .populate("idUser")
    .populate("idStore");

  res.render("table/table_tong_don_hang_theo_tuan", { list: listOrdersByWeek });
};

exports.getListTotalOrder = async (req, res) => {
  const listTotalOrder = await OrderModel.find()
    .populate("idUser")
    .populate("idStore");
  res.render("table/table_tong_don_hang", { list: listTotalOrder });
};

exports.getlistOrderByMonth = async (req, res) => {
  const current = moment();

  const firstDayOfMonth = current.clone().startOf("month");

  const daysInMonth = current.daysInMonth();

  const daysOfMonthFormatted = [];

  for (let i = 0; i < daysInMonth; i++) {
    const day = firstDayOfMonth.clone().add(i, "days");
    const formattedDay = day.format("YYYY-MM-DD");
    daysOfMonthFormatted.push(formattedDay);
  }

  console.log(daysOfMonthFormatted);

  const listOrdersByMonth = await OrderModel.find({
    createAt: {
      $gte: daysOfMonthFormatted[0],
      $lt: daysOfMonthFormatted[daysOfMonthFormatted.length - 1],
    },
    status: { $in: [3, 4] },
  })
    .populate("idUser")
    .populate("idStore");

    const date = new Date();
    const month = date.getMonth()+1
  res.render("table/table_tong_don_hang_thang", { list: listOrdersByMonth,month:month });
};

exports.getlistOrderByYear = async (req, res) => {
  const current = moment();

  const firstDayOfYear = current.clone().startOf("year");

  const lastDayOfYear = current.clone().endOf("year");

  const startDateFormatted = firstDayOfYear.format("YYYY-MM-DD");
  const endDateFormatted = lastDayOfYear.format("YYYY-MM-DD");

  const listOrdersByYear = await OrderModel.find({
    createAt: { $gte: startDateFormatted, $lt: endDateFormatted },
    status: { $in: [3, 4] },
  })
    .populate("idUser")
    .populate("idStore");
  const date = new Date();
  const year = date.getFullYear();
  res.render("table/table_tong_dong_hang_nam", { list: listOrdersByYear ,year:year});
};
