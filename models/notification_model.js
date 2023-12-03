var db = require("../configs/db_config");

const NotificationSchema = new db.Schema(
  {
    idUser: {
      type: db.Schema.Types.ObjectId,
      required: true,
      ref: "UserModel",
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      require: true,
    },
    createAt: {
      type: Date,
      required: false,
      default: Date.now(),
    },
    idOrder: {
      type: db.Schema.Types.ObjectId,
      required: true,
      ref: "OrderModel",
    },
  },
  {
    collection: "Notification",
  }
);

const NotificationMd = db.model("NotificationModel", NotificationSchema);

module.exports = NotificationMd;
