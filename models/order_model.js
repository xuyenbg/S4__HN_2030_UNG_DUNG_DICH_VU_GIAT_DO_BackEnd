const db =require('../configs/db_config');

const OrderSchema = new db.Schema(
    {
        idUser:{
            type:db.Schema.Types.ObjectId,
            required:true,
            ref:'UserModel'
        },
        idStore:{
            type:db.Schema.Types.ObjectId,
            required:true,
            ref:"StoreModel"
        },
        total:{
            type:Number,
            required:true
        },
        note:{
            type:String,
            required:true
        },
        transportType:{
            type:Number,
            required:true
        },
        methodPaymentType :{
            type:Number,
            required:true
        },
        feeDelivery:{
            type:Number,
            required:true
        },
        status:{
            type:Number,
            required:true
        },
        idAddress:{
            type:db.Schema.Types.ObjectId,
            required:true,
            ref:'AddressModel'
        },
        isPaid:{
            type:Boolean,
            required:true
        },
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

    },{
        collection:"Order"
    }
);
const OrderMd = db.model('OrderModel',OrderSchema);

module.exports = OrderMd;
