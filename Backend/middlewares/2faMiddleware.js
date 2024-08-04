const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

// Generate a new 2FA secret for a user
const generate2FASecret = async (req, res, next) => {
    const secret = speakeasy.generateSecret({ length: 20 });
    req.user.twoFactorSecret = secret.base32;
    await qrcode.toDataURL(secret.otpauth_url, (err, dataURL) => {
        if (err) {
            return res.status(500).json({ message: 'Error generating QR code' });
        }
        req.user.twoFactorQRCode = dataURL;
        next();
    });
};

// Verify a 2FA token
const verify2FA = (req, res, next) => {
    const { token } = req.body;
    const verified = speakeasy.totp.verify({
        secret: req.user.twoFactorSecret,
        encoding: 'base32',
        token: token
    });
    if (verified) {
        next();
    } else {
        return res.status(400).json({ message: 'Invalid 2FA token' });
    }
};

module.exports = { generate2FASecret, verify2FA };
