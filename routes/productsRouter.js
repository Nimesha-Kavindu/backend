import express from 'express';
import { addProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productController.js';

const productsRouter = express.Router();

productsRouter.post('/', addProduct);
productsRouter.get('/', getProducts);
productsRouter.delete('/:productId', deleteProduct);
productsRouter.put('/:productId', updateProduct);

export default productsRouter;