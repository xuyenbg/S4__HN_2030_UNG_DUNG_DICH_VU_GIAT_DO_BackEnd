const db = require('../configs/db_config');

const OrderSchema = new db.Schema(
    {
        idUser: {
            type: db.Schema.Types.ObjectId,
            required: false,
            ref: 'UserModel'
        },
        idStore: {
            type: db.Schema.Types.ObjectId,
            required: false,
            ref: "StoreModel"
        },
        total: {
            type: Number,
            required: false,
            default: 0
        },
        note: {
            type: String,
            required: false
        },
        transportType: {
            type: String,
            required: false
        },
        methodPaymentType: {
            type: String,
            required: false
        },
        feeDelivery: {
            type: Number,
            required: false
        },
        status: {
            type: Number,
            required: false
        },
        idAddress: {
            type: db.Schema.Types.ObjectId,
            required: false,
            ref: 'AddressModel'
        },
        isPaid: {
            type: Boolean,
            required: false
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
        },
        listItem: [
            {
                idService: {
                    type: db.Schema.Types.ObjectId,
                    ref: 'ServiceModel'
                },
                number: {
                    type: Number,
                    required: false,
                    default: 0
                },
                total: {
                    type: Number,
                    required: false,
                    default: 0
                },
                image: {
                    type: String,
                    required: false
                },
                attributeList: [
                    {
                        type: db.Schema.Types.ObjectId,
                        ref: 'AttributeModel'
                    }
                ]
            }
        ]

    }, {
    collection: "Order"
}
);
const OrderMd = db.model('OrderModel', OrderSchema);

module.exports = OrderMd;
