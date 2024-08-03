const mongoose = require('mongoose');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        country: { type: String, trim: true },
        zipCode: { type: String, trim: true }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem'
    }],
    order: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    role: {
        type: String,
        enum: ['user', 'seller', 'premiumSeller', 'admin'],
        default: 'user'
    },
    isTwoFactorEnabled: {
        type: Boolean,
        default: false
    },
    twoFactorSecret: {
        type: String
    },
    twoFactorRecoveryCodes: [String],  // Array to store recovery codes if using TOTP
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Ensure `updatedAt` is updated on save
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Method to enable 2FA
userSchema.methods.enableTwoFactor = async function() {
    const secret = speakeasy.generateSecret();
    this.twoFactorSecret = secret.base32;
    this.isTwoFactorEnabled = true;

    // Generate QR code
    const qrCodeUrl = speakeasy.otpauthURL({
        secret: secret.ascii,
        label: 'YourAppName',
        issuer: 'YourAppName'
    });
    try {
        const qrCodeDataUrl = await qrcode.toDataURL(qrCodeUrl);
        return { qrCodeDataUrl, secret: secret.base32 }; // Return QR code data URL for display
    } catch (err) {
        throw new Error('Error generating QR code');
    }
};

// Method to verify 2FA code
userSchema.methods.verifyTwoFactor = function(token) {
    return speakeasy.totp.verify({
        secret: this.twoFactorSecret,
        encoding: 'base32',
        token: token
    });
};

module.exports = mongoose.model('User', userSchema);
