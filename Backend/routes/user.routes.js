import express from 'express';
import { adminMiddleware, customerMiddleware } from '../middlewares/roleMiddleware.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import User from '../models/user.models.js';
import profile from '../controllers/profileController.js';
import { getProfile , updateProfile } from '../controllers/userController.js';


const router = express.Router();

// router.get('/:id', getUser);
// router.get('/admin/:id', adminMiddleware, getUser);
// router.get('/customer/:id', customerMiddleware, getUser);

router.post('/enable-2fa', authenticate, async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).send('User not found');
    }

    const otpAuthUrl = await user.enableTwoFactor();
    await user.save();

    res.status(200).send({ otpAuthUrl });
});

router.post('/verify-2fa', authenticate, async (req, res) => {
    const { token } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).send('User not found');
    }

    if (user.verifyTwoFactor(token)) {
        user.isTwoFactorEnabled = true;
        await user.save();
        res.status(200).send('2FA enabled successfully');
    } else {
        res.status(400).send('Invalid 2FA token');
    }
});

// router.get('/profile', authenticate,profile);
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);

router.get('/orders', authenticate, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id });
        res.json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


export default router;
