import express from 'express';
import { createCategory, getCategories } from '../controllers/categoryController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/roleMiddleware.js'; 

const router = express.Router();

router.post('/create', authenticate, adminMiddleware, createCategory);

router.get('/', getCategories);

export default router;
