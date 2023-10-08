const db = require("../configs/db_config");

const SetPriceSchema = new db.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
  {
    collection: "SetPrices",
  }
);

const SetPriceModel = db.model("SetPriceModel", SetPriceSchema);

module.exports = SetPriceModel;
