const db = require('../configs/db_config');

const RateSchema = new db.Schema(
    {
        idStore: {
            type: db.Schema.Types.ObjectId,
            required: true,
            ref: "StoreModel"
        },
        idService: {
            type: db.Schema.Types.ObjectId,
            required: true,
            ref: "ServiceModel"
        },
        idUser: {
            type: db.Schema.Types.ObjectId,
            required: true,
            ref: "UserModel"
        },
        rateNumber: {
            type: Number,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    },
    {
        collection: "Rates"
    }
)

const RateMd = db.model("RateModel", RateSchema);
module.exports = RateMd;