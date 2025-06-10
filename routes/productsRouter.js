import express from 'express';
import { addProduct, deleteProduct, getProducts } from '../controllers/productController.js';

const productsRouter = express.Router();

productsRouter.post('/', addProduct);
productsRouter.get('/', getProducts);
productsRouter.delete('/:productId', deleteProduct);

export default productsRouter;