const db = require('../configs/db_config')

const PostSchema = new db.Schema({
    idStore: {
        type: db.Schema.Types.ObjectId,
        required: true,
        ref: "StoreModel"
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    createAt: {
        type: Date,
        required: false,
        default: Date.now()
    }
}, {
    collection: "Posts"
})

const PostModel = db.model("PostModel", PostSchema)

module.exports = PostModel