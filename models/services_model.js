const db = require("../configs/db_config");

const ServiceSchema = new db.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        idStore: {
            type: db.Schema.Types.ObjectId,
            required: true,
            ref: "StoreModel",
        },
        attributeList: [
            {
                type: db.Schema.Types.ObjectId,
                required: false,
                ref: "AttributeModel",
            },
        ],
        price: {
            type: Number,
            required: true,
        },
        idCategory: {
            type: db.Schema.Types.ObjectId,
            required: true,
            ref: "CategoryModel",
        },
        idSale: {
            type: db.Schema.Types.ObjectId,
            required: false,
            ref: "SaleModel",
            default: null,
        },
        isActive: {
            type: Boolean,
            required: true,
        },
        unit: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
    },
    {
        collection: "Services",
    }
);

const ServiceModel = db.model("ServiceModel", ServiceSchema);

module.exports = ServiceModel;
