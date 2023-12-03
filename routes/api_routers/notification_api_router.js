var express = require("express");
const {
  getListNotification,
  getListNotificationByIdUser,
} = require("../../controllers/api_controllers/notification_api_controller");
var router = express.Router();

router.get("/", getListNotification);
router.get("/list-by-iduser/:idUser", getListNotificationByIdUser);

module.exports = router;
