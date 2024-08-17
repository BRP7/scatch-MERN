import express from 'express';
import upload from '../middlewares/multerMiddleware.js';
import { createProduct, getProduct, getPaginatedProducts } from '../controllers/productController.js';
import { adminMiddleware, sellerMiddleware, premiumSellerMiddleware } from '../middlewares/roleMiddleware.js';
import { authenticate } from '../middlewares/authMiddleware.js';

// Set up multer for handling file uploads
// const upload = multer({ dest: 'uploads' });

const router = express.Router();

router.get('/', getPaginatedProducts);
router.get('/:id', getProduct);
router.get('/admin/:id', adminMiddleware, getProduct);
router.get('/seller/:id', sellerMiddleware, getProduct);
router.get('/premium-seller/:id', premiumSellerMiddleware, getProduct);

// Route for handling file uploads
router.post('/upload-image', upload.single('image'), (req, res) => {
    res.json({ filePath: `uploads/${req.file.filename}` });
});

// Route for creating a product with file uploads
router.post('/create', authenticate, adminMiddleware, upload.array('images', 10), createProduct);

export default router;
