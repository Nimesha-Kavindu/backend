import Order from '../models/order.js';
import Product from '../models/product.js';

export async function createOrder(req, res) {
    //get user info
    //add current user name if not provided
    //orderId generate

    if (req.user == null) {
        return res.status(403).json({
            message: 'Please login and try again'
        });
    }

    const orderInfo = req.body;

    if (orderInfo.name == null) {
        orderInfo.name = req.user.firstName + ' ' + req.user.lastName;
    }

    let orderId = 'CBC00001';

    const lastOrder = await Order.find().sort({ date: -1 }).limit(1);

    if (lastOrder.length > 0) {
        const lastOrderId = lastOrder[0].orderId;
        const lastOrderNumberString = lastOrderId.replace('CBC', '');
        const lastOrderNumber = parseInt(lastOrderNumberString);
        const newOrderNumber = lastOrderNumber + 1;
        const newOrderNumberString = newOrderNumber.toString().padStart(5, '0');
        orderId = 'CBC' + newOrderNumberString;
    }


    try {

        let total = 0;
        let labelledTotal = 0;
        const products = [];

        for(let i = 0; i < orderInfo.products.length; i++) {
            const item = await Product.findOne({ productId: orderInfo.products[i].productId });
            if (item == null) {
                return res.status(404).json({
                    message: 'Product not found',
                    productId: orderInfo.products[i].productId
                });
            }

            if (item.isAvailable === false) {
                return res.status(404).json({
                    message: 'Product is not available right now',
                    productId: orderInfo.products[i].productId
                });
            }

            products[i] = {
                productInfo: {
                    productId: item.productId,
                    name: item.name,
                    altNames: item.altNames,
                    description: item.description,
                    images: item.images,
                    labelledPrice: item.lablelledPrice,
                    price: item.price
                },
                quantity: orderInfo.products[i].quantity
            };

            total += item.price * orderInfo.products[i].quantity;
            labelledTotal += item.lablelledPrice * orderInfo.products[i].quantity;
        }

        const order = new Order(
            {
                orderId: orderId,
                email: req.user.email,
                phone: req.user.phone,
                name: orderInfo.name,
                address: orderInfo.address,
                total: orderInfo.total,
                products: []
            }
        )

        await order.save();
        res.json({
            message: 'Order created successfully',
            orderId: order.orderId,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating order',
            error: error.message
        });
    }
}