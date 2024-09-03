// routes/cart.routes.js
import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { addToCart, getCart } from '../controllers/cartController.js';

const router = express.Router();

router.post('/add', authenticate, addToCart);
router.get('/', authenticate, getCart);

export default router;