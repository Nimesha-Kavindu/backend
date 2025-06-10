import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export function addProduct(req, res) {

    if (!isAdmin(req)) {
        return res.status(403).json({
            message: 'You are not authorized to add a product'
        });
    }

    const product = new Product(req.body);   

    product.save().then(
        () => {
            res.json({
                message: 'Product saved successfully',
            });
        }
    ).catch(
        () => {
            res.json({
                message: 'Error saving product',
            });
        }
    )
}

export async function getProducts(req, res) {
    try {

        if (isAdmin(req)) {
            const products = await Product.find();
            res.json(products);
        }
        else {
            const products = await Product.find({ isAvailable: true });
            res.json(products);
        }

    } catch (error) {
        res.status(500).json({
            message: 'Error fetching products',
            error: error.message
        });
    }
}

export async function deleteProduct(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: 'You are not authorized to delete a product'
        });
    }

    try {
        await Product.deleteOne({ prodctId: req.params.productId });

        res.json({
            message: 'Product deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Error deleting product',
            error: error.message
        });
    }
}

export async function updateProduct(req, res) {
    if (!isAdmin(req)) {
        return res.status(403).json({
            message: 'You are not authorized to update a product'
        });
    }

    const productId = req.params.productId;
    const updatingData = req.body;

    try{
        await Product.updateOne({ productId: productId }, updatingData);
        res.json({
            message: 'Product updated successfully',
        });
    }catch{
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }

}

export async function getProductById(req, res) {
    const productId = req.params.productId;

        try{
            const product = await Product.findOne({ productId: productId });

            if(product == null) {
                return res.status(404).json({
                    message: 'Product not found'
                });
            }
            
            if(product.isAvailable) {
                res.json(product);
            }else{
                if(!isAdmin(req)) {
                    return res.status(403).json({
                        message: 'Product is not available'
                    });
                }else {
                    res.json(product);
                }
            }

        }catch(error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }

}