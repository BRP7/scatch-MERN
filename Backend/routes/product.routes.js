import express from 'express';
import { createProduct,getProduct } from '../controllers/productController.js';
import { adminMiddleware, sellerMiddleware, premiumSellerMiddleware } from '../middlewares/roleMiddleware.js';
import { authenticate } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.get('/:id', getProduct);

router.get('/admin/:id', adminMiddleware, getProduct);

router.get('/seller/:id', sellerMiddleware, getProduct);

router.get('/premium-seller/:id', premiumSellerMiddleware, getProduct);

// router.post('/create', verifyToken, isAdmin, async (req, res) => {
//     const { name, description, price, stock, category, images, seller } = req.body;

//     try {
//         const newProduct = new Product({
//             name,
//             description,
//             price,
//             stock,
//             category,
//             images,
//             seller
//         });
//         await newProduct.save();
//         res.status(201).json(newProduct);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });

router.post('/create', authenticate, adminMiddleware, createProduct);

export default router;
