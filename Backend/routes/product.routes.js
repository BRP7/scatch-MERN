import express from 'express';
import upload from '../middlewares/multerMiddleware.js';
import { createProduct, getAllProductsForAdmin ,getProduct, getPaginatedProducts, deleteProduct } from '../controllers/productController.js';
import { adminMiddleware } from '../middlewares/roleMiddleware.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Routes accessible by any user
router.get('/', getPaginatedProducts);
router.get('/:id', getProduct);

// Admin routes
router.get('/admin/products', authenticate, adminMiddleware,getAllProductsForAdmin);
router.delete('/admin/delete/:id', authenticate, adminMiddleware, deleteProduct); // Delete a product

// Create product route (admin only)
router.post('/create', authenticate, adminMiddleware, upload.array('images', 10), createProduct);

// Route for handling file uploads
router.post('/upload-image', upload.single('image'), (req, res) => {
    res.json({ filePath: `uploads/${req.file.filename}` });
});

export default router;
