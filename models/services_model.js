const db = require('../configs/db_config')

const ServiceSchema = new db.Schema({
    name: {
        type: String,
        required: true
    },
    idStore: {
        type: db.Schema.Types.ObjectId,
        required: true,
        ref: "StoreModel"
    },
    attributeList: [
        {
            type: db.Schema.ObjectId,
            required: true,
            ref: "AttributeModel"
        }
    ],
    price: {
        type: Number,
        required: true
    },
    idCategory: {
        type: db.Schema.Types.ObjectId,
        required: true,
        ref: "CategoryModel"
    },
    idSale: {
        type: db.Schema.Types.ObjectId,
        required: true,
        ref: "SaleModel"
    },
    isActive: {
        type: Boolean,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    collection: "Services"
})

const ServiceModel = db.model("ServiceModel", ServiceSchema);

module.exports = ServiceModel