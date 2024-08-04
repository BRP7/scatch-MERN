const express = require('express');
const router = express.Router();
const User = require('../models/user.models.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { email, password, token } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send('Invalid credentials');
    }

    const isMatch = await user.verifyPassword(password);
    if (!isMatch) {
        return res.status(400).send('Invalid credentials');
    }

    if (user.twoFactorEnabled) {
        if (!token) {
            return res.status(400).send('2FA token required');
        }
        if (!user.verify2FAToken(token)) {
            return res.status(400).send('Invalid 2FA token');
        }
    }

    const authToken = user.generateAuthToken();
    res.status(200).send({ token: authToken });
});

module.exports = router;
