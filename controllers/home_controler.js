const StoreModel = require("../models/stores_model");
const OrderModel = require("../models/order_model");
const moment = require("moment");

exports.data = async (req, res) => {
  try {
    // Số lượng store
    var listStore = await StoreModel.find();
    // Tổng doanh thu tất cả cửa hàng
    var listOrder = await OrderModel.find({ status: 4 });
    var totalOrder = 0;
    for (let index = 0; index < listOrder.length; index++) {
      totalOrder += listOrder[index].total;
    }
    // Đơn hàng hôm nay

    const listOrderByDate = await OrderModel.find({ status: 1 });
    const currentDate = moment().format("YYYY-MM-DD");
    var countOrder = 0;
    for (let index = 0; index < listOrderByDate.length; index++) {
      const formatDate = moment(listOrderByDate[index].createAt).format("YYYY-MM-DD");
      if (formatDate === currentDate) {
        countOrder++;
      }
    }

    //Pie chart
    var listOrderCancel = await OrderModel.find({status:5});
    var listOrderBySuccess = await OrderModel.find({status:4});
    var sumPercent = listOrderCancel.length+listOrderBySuccess.length
    var percentListOrderCancel = (listOrderCancel.length/sumPercent)*100;
    var percentListOrderBySuccess = (listOrderBySuccess.length/sumPercent)*100

    console.log(currentDate);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }

  return res.render("home", {
    count: listStore.length,
    totalOrder: totalOrder,
    listOrder: listOrder.length,
    countOrder:countOrder,
    percentListOrderCancel:percentListOrderCancel,
    numberOrderCancel:listOrderCancel.length,
    numberListOrderBySuccess:listOrderBySuccess.length,
    percentListOrderBySuccess:percentListOrderBySuccess,
    sumPercent:sumPercent
  });
};
