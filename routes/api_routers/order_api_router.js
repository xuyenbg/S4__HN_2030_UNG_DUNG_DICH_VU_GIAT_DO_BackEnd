var express = require("express");
const {
  getListOrderModel,
  getListOrderByIdStore,
  getListOrderByStatusAndUser,
  getListOrderByStatusAndStoreAndUser,
  getListOrderByIdStoreAndIdUser,
  getListOrderByIdUser,
  insertOrder,
  updateStatusOrder,
  getTotalOrderByDay,
  updateOrder,
  getOrderDetail,
  getListOrderTodayByIdStore,
  getListOrderByDateAndStatus,
} = require("../../controllers/api_controllers/order_api_controllers");
var router = express.Router();

router.get("/list", getListOrderModel);
router.post("/insert", insertOrder);
router.put("/update-status/:idOrder", updateStatusOrder);
router.put("/update-order/:idOrder", updateOrder);
router.get("/order-detail/:idOrder", getOrderDetail);
router.get("/get-list-order-by-idUser/:idUser", getListOrderByIdUser);
router.get(
  "/get-list-order-by-idStore-idUser/:idStore/:idUser",
  getListOrderByIdStoreAndIdUser
);
router.get("/get-list-order-by-idStore/:idStore", getListOrderByIdStore);
router.get(
  "/get-list-order-by-status-store-user/:idStore/:idUser/:status",
  getListOrderByStatusAndStoreAndUser
);
router.get(
  "/get-list-order-by-status-user/:idUser/:status",
  getListOrderByStatusAndUser
);
router.get(
  "/list-order-today-by-idstore-status/:idStore",
  getListOrderTodayByIdStore
);
router.get("/list-order-by-date-status/:idStore", getListOrderByDateAndStatus);
router.get("/total-order-by-currentdate",getTotalOrderByDay)

module.exports = router;
