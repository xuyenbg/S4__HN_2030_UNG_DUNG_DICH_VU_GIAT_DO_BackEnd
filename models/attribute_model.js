const db = require('../configs/db_config');

const AttributeSchema = new db.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true
        }
    }, {
        collection: 'Attribute'
    }
);

const AttributeMd = db.model("AttributeModel", AttributeSchema);

module.exports = AttributeMd;