import express from 'express';
import { getUser } from '../controllers/userController.js';
import { adminMiddleware, customerMiddleware } from '../middlewares/roleMiddleware.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import User from '../models/user.models.js';

const router = express.Router();

router.get('/:id', getUser);
router.get('/admin/:id', adminMiddleware, getUser);
router.get('/customer/:id', customerMiddleware, getUser);

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


export default router;
