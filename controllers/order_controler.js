const OrderModel = require("../models/order_model");

const moment = require("moment");

function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

exports.getListOrderModel = async (req, res) => {
  try {
    const listOrder = await OrderModel.find({ status: { $in: [3, 4] } })
      .populate("idUser")
      .populate("idStore");
    var totalOrder = 0;
    for (let index = 0; index < listOrder.length; index++) {
      totalOrder += listOrder[index].total;
    }

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
      totalOrder: formatNumberWithCommas(totalOrder),
    });
  } catch (err) {
    res.status(500).send("Có lỗi xảy ra");
  }
};

function formatDateString(inputDateString) {
  // Sử dụng Moment.js để định dạng lại chuỗi ngày tháng
  var formattedDateString = moment(inputDateString, "DD-MM-YYYY").format(
    "YYYY-MM-DD"
  );

  return formattedDateString;
}

function formatDate(dateString) {
  var dateObject = new Date(dateString);

  var day = dateObject.getDate();
  var month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0
  var year = dateObject.getFullYear();

  // Chuyển định dạng thành "dd/mm/yyyy"
  var formattedDate =
    (day < 10 ? "0" : "") +
    day +
    "-" +
    (month < 10 ? "0" : "") +
    month +
    "-" +
    year;

  return formattedDate;
}

exports.getlistOrderByDate = async (req, res) => {
  const currentDate = moment().format("YYYY-MM-DD");
  var day = req.query.day;
  var dateRegex = /^\d{2}-\d{2}-\d{4}$/;
  var msg = "";
  var dayCheck = day;
  




  if (day == undefined || day == "") {
    day = currentDate;
    dayCheck= formatDate(currentDate)
    msg=""
  }
  else{
    day = formatDateString(day)
  } 

  console.log(dayCheck);
  var check = dateRegex.test(dayCheck);
  if(!check){
    msg="Nhập không đúng định dạng"
  }
  
  const listOrderByDate = await OrderModel.find({ status: { $in: [3, 4] } })
    .populate("idUser")
    .populate("idStore");
  var totalCurrentDate = 0;
  var list = [];
  for (let index = 0; index < listOrderByDate.length; index++) {
    const formatDate = moment(listOrderByDate[index].createAt).format(
      "YYYY-MM-DD"
    );

    if (formatDate == day) {
      totalCurrentDate += listOrderByDate[index].total;
      list.push(listOrderByDate[index]);
    }
  }
  res.render("table/table_tong_don_hang_theo_ngay", {
    list: list,
    msg: msg,
    currentDate: check ? formatDate(day):"",
    formatDate: formatDate,
    totalCurrentDate: formatNumberWithCommas(totalCurrentDate),
  });
};

exports.getlistOrderByWeek = async (req, res) => {
  const dayStart = req.query.dayStart;
  const dayEnd = req.query.dayEnd;
  try {
    if (
      dayStart == "" ||
      dayStart == undefined ||
      dayEnd == "" ||
      dayEnd == undefined
    ) {
      const current = moment();
      const currentDayOfWeek = current.day();
      const firstDayOfWeek = current.clone().startOf("week");

      const daysOfWeekFormatted = [];

      for (let i = 0; i < 7; i++) {
        const day = firstDayOfWeek.clone().add(i, "days");
        const formattedDay = day.format("YYYY-MM-DD");
        daysOfWeekFormatted.push(formattedDay);
      }
      console.log("Longmgmgm"+daysOfWeekFormatted);

      const listOrdersByWeek = await OrderModel.find({
        createAt: { $gte: daysOfWeekFormatted[0], $lt: daysOfWeekFormatted[6] },
        status: { $in: [3, 4] },
      })
        .populate("idUser")
        .populate("idStore");
      console.log(
        formatDate(daysOfWeekFormatted[0]) + "?" + daysOfWeekFormatted[6]
      );

      var totalOrder = 0;
      listOrdersByWeek.forEach((item) => (totalOrder += parseInt(item.total)));
      res.render("table/table_tong_don_hang_theo_tuan", {
        list: listOrdersByWeek,
        formatDate: formatDate,
        msg: "",
        totalOrder: formatNumberWithCommas(totalOrder),
        weekstart: formatDate(daysOfWeekFormatted[0]),
        weekend: formatDate(daysOfWeekFormatted[6]),
      });
    } else {
      var dateRegex = /^\d{2}-\d{2}-\d{4}$/;
      if (dateRegex.test(dayStart) && dateRegex.test(dayEnd)) {
        const dateOne = formatDateString(dayStart);
        const dateTwo = formatDateString(dayEnd);
        const listOrdersByWeek = await OrderModel.find({
          createAt: { $gte: dateOne, $lt: dateTwo },
          status: { $in: [3, 4] },
        })
          .populate("idUser")
          .populate("idStore");
        var totalOrder = 0;
        listOrdersByWeek.forEach(
          (item) => (totalOrder += parseInt(item.total))
        );
        res.render("table/table_tong_don_hang_theo_tuan", {
          list: listOrdersByWeek,
          formatDate: formatDate,
          msg: "",
          weekstart: dayStart,
          totalOrder: formatNumberWithCommas(totalOrder),
          weekend: dayEnd,
        });
      } else {
        const checkStart = dateRegex.test(dayStart);
        const checkEnd = dateRegex.test(dayEnd);
        var msg = "";
        if (!checkStart) {
          msg = "Ngày bắt đầu sai định dạng";
        }
        if (!checkEnd) {
          msg = "Ngày kết thúc sai định dạng";
        }

        if (!checkStart && !checkEnd) {
          msg = "Ngày bắt đầu sai và ngày kết thúc sai định dạng";
        }
        res.render("table/table_tong_don_hang_theo_tuan", {
          list: [],
          msg: msg,
          formatDate: formatDate,
          weekstart: dayStart,
          totalOrder: formatNumberWithCommas(0),
          weekend: dayEnd,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getListTotalOrder = async (req, res) => {
  const listTotalOrder = await OrderModel.find()
    .populate("idUser")
    .populate("idStore");
  listTotalOrder.forEach((item) => {
    if (item.idUser == null) {
      console.log(item);
    }
  });
  res.render("table/table_tong_don_hang", { list: listTotalOrder });
};

exports.getlistOrderByMonth = async (req, res) => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const monthLoc = req.query.month;
  const yearLoc = req.query.year;

  var monthCurrent = "";
  var dateStart = "";
  var dateEnd = "";

  if (
    monthLoc == undefined ||
    yearLoc == undefined ||
    monthLoc == "" ||
    yearLoc == ""
  ) {
    if (month < 10) {
      monthCurrent = `0${month}`;
    } else {
      monthCurrent = month;
    }
    dateStart = `${year}-${monthCurrent}-01`;
    dateEnd = `${year}-${monthCurrent}-31`;
  } else {
    monthCurrent = monthLoc;
    dateStart = `${yearLoc}-${monthLoc}-01`;
    dateEnd = `${yearLoc}-${monthLoc}-31`;
  }
  const listOrdersByMonth = await OrderModel.find({
    createAt: {
      $gte: dateStart,
      $lt: dateEnd,
    },
    status: { $in: [3, 4] },
  })
    .populate("idUser")
    .populate("idStore");

  var totalOrder = 0;
  listOrdersByMonth.forEach((item) => (totalOrder += parseInt(item.total)));

  res.render("table/table_tong_don_hang_thang", {
    list: listOrdersByMonth,
    month: monthCurrent,
    formatDate: formatDate,
    totalOrder: formatNumberWithCommas(totalOrder),
  });
};

exports.getlistOrderByYear = async (req, res) => {
  const date = new Date();
  var year = date.getFullYear();
  const yearCurrent = req.query.year;
  var dateStart = "";
  var dateEnd = "";
  if (yearCurrent == undefined || yearCurrent == "") {
    dateStart = `${year}-01-01`;
    dateEnd = `${year}-12-31`;
  } else {
    year = yearCurrent;
    dateStart = `${yearCurrent}-01-01`;
    dateEnd = `${yearCurrent}-12-31`;
  }

  const listOrdersByYear = await OrderModel.find({
    createAt: { $gte: dateStart, $lt: dateEnd },
    status: { $in: [3, 4] },
  })
    .populate("idUser")
    .populate("idStore");
  var total = 0;
  listOrdersByYear.forEach((item) => (total += item.total));

  res.render("table/table_tong_dong_hang_nam", {
    list: listOrdersByYear,
    year: year,
    formatDate: formatDate,
    total: formatNumberWithCommas(total),
  });
};
