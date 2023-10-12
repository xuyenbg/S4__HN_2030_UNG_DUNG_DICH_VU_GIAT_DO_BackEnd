var db = require('../configs/db_config');

const ItemServiceSchema = new db.Schema(
    {
        idService:{
            type:db.Schema.Types.ObjectId,
            required:true,
            ref:'ServiceModel'
        },
        number:{
            type:Number,
            required:true,
        },
        total:{
            type:Number,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        idOrder:{
            type:db.Schema.Types.ObjectId,
            required:true,
            ref:'OrderModel'
        }
    },
    {
        collection:'ItemService'
    }
);
const ItemServiceMd = db.model('ItemServiceModel',ItemServiceSchema);

module.exports = ItemServiceMd;