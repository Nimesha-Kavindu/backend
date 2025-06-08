import express from 'express';
import { addProduct, getProducts } from '../controllers/productController.js';

const productsRouter = express.Router();

productsRouter.post('/', addProduct);
productsRouter.get('/', getProducts)

export default productsRouter;