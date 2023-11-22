const db = require("../configs/db_config");

const RateSchema = new db.Schema(
  {
    idStore: {
      type: db.Schema.Types.ObjectId,
      required: true,
      ref: "StoreModel",
    },
    idUser: {
      type: db.Schema.Types.ObjectId,
      required: true,
      ref: "UserModel",
    },
    idOrder:{
      type: db.Schema.Types.ObjectId,
      required: true,
      ref: "OrderModel",
    },
    rateNumber: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Rates",
  }
);

const RateMd = db.model("RateModel", RateSchema);
module.exports = RateMd;
