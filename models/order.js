import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        ordrerId: {
            type: String,
            required: true,
            unique: true
        },
        userEmail: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            default: 'Pending'
        },
        lablledTotal: {
            type: Number,
            required: true
        },
        total : {
            type: Number,
            required: true
        },
        products: [
            {
                productInfo: {
                    produtId : {
                        type: String,
                        required: true
                    },
                    name: {
                        type: String,
                        required: true
                    },
                    altNames : [
                        {
                            type: String,
                            required: true
                        }
                    ],
                    description : {
                        type: String,
                        required: true
                    },
                    images : [
                        {
                            type: String,
                            required: true
                        }
                    ],
                    labelledPrice: {
                        type: Number,
                        required: true
                    },
                    price : {
                        type: Number,
                        required: true
                    },
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        date : {
            type: Date,
            default: Date.now
        }
    }
)

const Order = mongoose.model('Order', orderSchema);

export default Order;
