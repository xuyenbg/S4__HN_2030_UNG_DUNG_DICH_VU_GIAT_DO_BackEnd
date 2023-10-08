const db = require("../configs/db_config");

const CategorySchema = new db.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Categories",
  }
);

const CategoryModel = db.model("CategoryModel", CategorySchema);

module.exports = CategoryModel;
