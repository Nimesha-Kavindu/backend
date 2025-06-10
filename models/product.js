import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        altNames: [
            {
                type: String,
            }
        ],
        description: {
            type: String,
            required: true
        },
        images : [
            {
                type: String,
                required: true
            }
        ],
        lablelledPrice: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        isAvailable: {
            type: Boolean,
            default: true
        },
        

    }
)

const Product = mongoose.model('product', productSchema);

export default Product;