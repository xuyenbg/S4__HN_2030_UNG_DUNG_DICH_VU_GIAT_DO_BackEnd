const StoreModel = require("../models/stores_model");
const OrderModel = require("../models/order_model");
const UserModel = require("../models/users_model");
const moment = require("moment");

const getTotalByMonth = async (month) => {
  // Lấy ngày bắt đầu của tháng 1
  const startDate = moment()
    .set({ month: month, date: 1 })
    .startOf("day")
    .format("YYYY-MM-DD");
  // Lấy ngày kết thúc của tháng 1
  const endDate = moment(startDate).endOf("month").format("YYYY-MM-DD");
  //Tổng
  var listOrderByMonth = await OrderModel.find({
    createAt: { $gte: startDate, $lt: endDate },
    status: { $in: [3, 4] },
  });
  var totalByMonth = 0;
  listOrderByMonth.forEach((item) => {
    totalByMonth += item.total;
  });
  return { listOrder: listOrderByMonth.length, total: totalByMonth };
};

exports.data = async (req, res) => {
  // Số lượng store
  var listStore = await StoreModel.find();
  
  // Tổng doanh thu tất cả cửa hàng
  var listOrder = await OrderModel.find({ status: { $in: [3, 4] } });
  var totalOrder = 0;
  for (let index = 0; index < listOrder.length; index++) {
    totalOrder += listOrder[index].total;
  }

  var listTotalOrder = await OrderModel.find()

  // Tổng doanh thu hôm nay

  const listOrderByDate = await OrderModel.find({ status: { $in: [3, 4] } });
  const currentDate = moment().format("YYYY-MM-DD");
  var totalCurrentDate = 0;
  for (let index = 0; index < listOrderByDate.length; index++) {
    const formatDate = moment(listOrderByDate[index].createAt).format(
      "YYYY-MM-DD"
    );
    if (formatDate === currentDate) {
      totalCurrentDate +=listOrderByDate[index].total;
    }
  }

  // Tổng doanh thu tuần 

  const current = moment();
  const currentDayOfWeek = current.day();

  const firstDayOfWeek = current.clone().startOf('week');
  
  const daysOfWeekFormatted = [];
  
  for (let i = 0; i < 7; i++) {
    const day = firstDayOfWeek.clone().add(i, 'days');
    const formattedDay = day.format('YYYY-MM-DD');
    daysOfWeekFormatted.push(formattedDay);
  }
  
  console.log(daysOfWeekFormatted);

  const listOrdersByWeek = await OrderModel.find({
    createAt: { $gte: daysOfWeekFormatted[0], $lt: daysOfWeekFormatted[6] },
    status: { $in: [3, 4] },
  });
  var totalByWeek = 0

  listOrdersByWeek.forEach((item)=>{
    totalByWeek += item.total
  })

  //Tổng doanh thu tháng hiện tại 

const firstDayOfMonth = current.clone().startOf('month');

const daysInMonth = current.daysInMonth();

const daysOfMonthFormatted = [];

for (let i = 0; i < daysInMonth; i++) {
  const day = firstDayOfMonth.clone().add(i, 'days');
  const formattedDay = day.format('YYYY-MM-DD');
  daysOfMonthFormatted.push(formattedDay);
}

console.log(daysOfMonthFormatted);

const listOrdersByMonth = await OrderModel.find({
  createAt: { $gte: daysOfMonthFormatted[0], $lt: daysOfMonthFormatted[daysOfMonthFormatted.length-1] },
  status: { $in: [3, 4] },
});
var totalByMonth = 0

listOrdersByMonth.forEach((item)=>{
  totalByMonth += item.total
});

//Tổng doanh thu năm 

const firstDayOfYear = current.clone().startOf('year');

const lastDayOfYear = current.clone().endOf('year');

const startDateFormatted = firstDayOfYear.format('YYYY-MM-DD');
const endDateFormatted = lastDayOfYear.format('YYYY-MM-DD');

const listOrdersByYear = await OrderModel.find({
  createAt: { $gte: startDateFormatted, $lt: endDateFormatted },
  status: { $in: [3, 4] },
});
var totalByYear = 0

listOrdersByYear.forEach((item)=>{
  totalByYear += item.total
});






  //Số lượng khách hàng

  var listUser = await UserModel.find({ idRole: "6522667961b6e95df121642e" });

  //Pie chart
  var listOrderCancel = await OrderModel.find({ status: 5 });
  var listOrderBySuccess = await OrderModel.find({ status: { $in: [3, 4] } });
  var sumPercent = listOrderCancel.length + listOrderBySuccess.length;
  var percentListOrderCancel = (listOrderCancel.length / sumPercent) * 100;
  var percentListOrderBySuccess =
    (listOrderBySuccess.length / sumPercent) * 100;

  //Chart-area
  var countOrderByMonth1 = (await getTotalByMonth(0)).listOrder;
  var totalByMonth1 = (await getTotalByMonth(0)).total;
  var listOrderByMonth2 = (await getTotalByMonth(1)).listOrder;
  var totalByMonth2 = (await getTotalByMonth(1)).total;
  var listOrderByMonth3 = (await getTotalByMonth(2)).listOrder;
  var totalByMonth3 = (await getTotalByMonth(2)).total;
  var listOrderByMonth4 = (await getTotalByMonth(3)).listOrder;
  var totalByMonth4 = (await getTotalByMonth(3)).total;
  var listOrderByMonth5 = (await getTotalByMonth(4)).listOrder;
  var totalByMonth5 = (await getTotalByMonth(4)).total;
  var listOrderByMonth6 = (await getTotalByMonth(5)).listOrder;
  var totalByMonth6 = (await getTotalByMonth(5)).total;
  var listOrderByMonth7 = (await getTotalByMonth(6)).listOrder;
  var totalByMonth7 = (await getTotalByMonth(6)).total;
  var listOrderByMonth8 = (await getTotalByMonth(7)).listOrder;
  var totalByMonth8 = (await getTotalByMonth(7)).total;
  var listOrderByMonth9 = (await getTotalByMonth(8)).listOrder;
  var totalByMonth9 = (await getTotalByMonth(8)).total;
  var listOrderByMonth10 = (await getTotalByMonth(9)).listOrder;
  var totalByMonth10 = (await getTotalByMonth(9)).total;
  var listOrderByMonth11 = (await getTotalByMonth(10)).listOrder;
  var totalByMonth11 = (await getTotalByMonth(10)).total;
  var listOrderByMonth12 = (await getTotalByMonth(11)).listOrder;
  var totalByMonth12 = (await getTotalByMonth(11)).total;

  //Top 5 cửa hàng
    const listOrderTop = await OrderModel.find({status: { $in: [3, 4] }})
      .populate("idUser")
      .populate("idStore");
   const listMerge = new Set(listOrderTop.map((item)=>item['idStore']))
    const listStoreTop = []
   for (const item of listMerge) {
    const listOrderByIdStore = await OrderModel.find({idStore:item._id,status: { $in: [3, 4] }})
    const objOrderByIdStore = await OrderModel.findOne({idStore:item._id}).populate("idUser")
    .populate("idStore");
    let total = 0;
    listOrderByIdStore.forEach((item)=>{
      total += item.total
    })
    objOrderByIdStore['countOrder']= listOrderByIdStore.length;
    objOrderByIdStore.total = total;
    listStoreTop.push(objOrderByIdStore);
    total = 0;
   }
   const sortListStore = listStoreTop.sort((a,b)=>b.total-a.total);
   const sortListStoreTop = sortListStore.slice(0,5);


   //Thongke ngay tuan thang nam

   
  

  return res.render("home", {
    count: listStore.length,
    totalOrder: totalOrder,
    listOrder: listTotalOrder.length,
    percentListOrderCancel: percentListOrderCancel,
    numberOrderCancel: listOrderCancel.length,
    numberListOrderBySuccess: listOrderBySuccess.length,
    percentListOrderBySuccess: percentListOrderBySuccess,
    sumPercent: sumPercent,
    listUser: listUser.length,
    countOrderByMonth1: countOrderByMonth1,
    totalByMonth1: totalByMonth1,
    countOrderByMonth2: listOrderByMonth2,
    totalByMonth2: totalByMonth2,
    countOrderByMonth3: listOrderByMonth3,
    totalByMonth3: totalByMonth3,
    countOrderByMonth4: listOrderByMonth4,
    totalByMonth4: totalByMonth4,
    countOrderByMonth5: listOrderByMonth5,
    totalByMonth5: totalByMonth5,
    countOrderByMonth6: listOrderByMonth6,
    totalByMonth6: totalByMonth6,
    countOrderByMonth7: listOrderByMonth7,
    totalByMonth7: totalByMonth7,
    countOrderByMonth8: listOrderByMonth8,
    totalByMonth8: totalByMonth8,
    countOrderByMonth9: listOrderByMonth9,
    totalByMonth9: totalByMonth9,
    countOrderByMonth10: listOrderByMonth10,
    totalByMonth10: totalByMonth10,
    countOrderByMonth11: listOrderByMonth11,
    totalByMonth11: totalByMonth11,
    countOrderByMonth12: listOrderByMonth12,
    totalByMonth12: totalByMonth12,
    sortListStoreTop:sortListStoreTop,
    totalCurrentDate:totalCurrentDate,
    totalByWeek:totalByWeek,
    totalByMonth:totalByMonth,
    totalByYear:totalByYear
  });
};
