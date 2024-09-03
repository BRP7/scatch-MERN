import express from 'express';
import Seller from '../models/seller.models.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        console.log('Received request for /api/sellers');
        const sellers = await Seller.find().populate('user', 'name');
        console.log('Sellers fetched:', sellers);
        res.json(sellers);
    } catch (error) {
        console.error('Error fetching sellers:', error);
        res.status(500).json({ message: error.message });
    }
});

export default router;
