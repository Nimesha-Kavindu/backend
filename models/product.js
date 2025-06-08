import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    stock: Number
})

const Product = mongoose.model('product', productSchema);

export default Product;