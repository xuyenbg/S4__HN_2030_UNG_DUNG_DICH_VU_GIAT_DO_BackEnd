const db = require('../configs/db_config')

const AddressSchema = new db.Schema({
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    isDefault: {
        type: Boolean,
        required: true
    },
    idUser: {
        type: db.Schema.Types.ObjectId,
        required: true,
        ref: "UserModel"
    },
    address: {
        type: String,
        required: true
    }
}, {
    collection: "Address"
})

const AddressModel = db.model("AddressModel", AddressSchema)

module.exports = AddressModel