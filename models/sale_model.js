var db = require('../configs/db_config');

const SaleSchema = new db.Schema(
    {
        "unit": {
            type: String,
            required: true
        },
        "value": {
            type: Number,
            required: true
        }
    },
    {
        collection: 'Sale'
    }
);

const SaleMd = db.model("SaleModel", SaleSchema);

module.exports = SaleMd;