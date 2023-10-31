const db = require('../configs/db_config')

const StoreSchema = new db.Schema({
    name: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: false,
        default: 0
    },
    idUser: {
        type: db.Schema.Types.ObjectId,
        required: true,
        ref: "UserModel"
    },
    idAddress: {
        type: db.Schema.Types.ObjectId,
        required: true,
        ref: "AddressModel"
    },
    status: {
        type: Number,
        required: true
    },
    transportTypeList: [
        {
            type: String,
            required: true
        }
    ],
    imageQRCode: {
        type: String,
        required: false
    }
}, {
    collection: "Stores"
})

const StoreModel = db.model("StoreModel", StoreSchema)

module.exports = StoreModel;