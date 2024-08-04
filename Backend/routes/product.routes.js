import express from 'express';
import { getProduct } from '../controllers/productController.js';
import { adminMiddleware, sellerMiddleware, premiumSellerMiddleware } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/:id', getProduct);

router.get('/admin/:id', adminMiddleware, getProduct);

router.get('/seller/:id', sellerMiddleware, getProduct);

router.get('/premium-seller/:id', premiumSellerMiddleware, getProduct);

export default router;
