import Product from "../models/product.js";

export function addProduct(req, res) {

    if(req.user == null) {
        return res.status(403).json({
            message: 'Unauthorized'
        });
    }else if(req.user.role != 'admin') {
        return res.status(403).json({
            message: 'Forbidden: Only admins can add products'
        });
    }

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock
    })
    product.save().then(
        ()=>{
            res.json({
                message: 'Product saved successfully',
            });
        }
    ).catch(
        ()=>{
            res.json({
                message: 'Error saving product',
            });
        }
    )
}

export function getProducts(req, res) {
    Product.find().then(
        (data) => {
            res.json(data);
        }
    ).catch(
        () => {
            res.json({
                message: 'Error fetching products'
            });
        }
    );
}