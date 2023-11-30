const OrderModel = require("../models/order_model");

const moment = require("moment");


exports.getListOrderModel = async (req, res) => {
  try {
    const listOrder = await OrderModel.find({status: { $in: [3, 4] }})
      .populate("idUser")
      .populate("idStore");
   const listMerge = new Set(listOrder.map((item)=>item['idStore']))
   var list = []

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
    list.push(objOrderByIdStore);
    total = 0;
   }
   console.log(list[0].countOrder);

    res.render("table/table_tong_doanh_thu_cua_hang", {
      listOrder: list,
    });
  } catch (err) {
    res.status(500).send("Có lỗi xảy ra");
  }
};

exports.getlistOrderByDate = async(req,res)=>{
  const listOrderByDate = await OrderModel.find({ status: { $in: [3, 4] } }).populate("idUser");
  
  res.render('table/table_tong_don_hang_dat_hom_nay',{list:listOrderByDate})
}
