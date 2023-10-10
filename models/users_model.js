const db = require('../configs/db_config')

const UserSchema = new db.Schema({
    phone: {
        type: String,
        required: true
    },
    passwd: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    idRole: {
        type: db.Schema.Types.ObjectId,
        required: true,
        ref: "RoleModel"
    },
    favoriteStores: [
        {
            idStore: {
                type: db.Schema.ObjectId,
                required: false,
                ref: "StoreModel"
            }
        }
    ],
    createAt: {
        type: Date,
        required: false,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        required: false,
        default: Date.now()
    }
}, {
    collection: "Users"
})

const UserModel = db.model("UserModel", UserSchema);

module.exports = UserModel;