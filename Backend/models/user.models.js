import mongoose from 'mongoose';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import bcrypt from 'bcrypt';

// Define the user schema
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

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Enable two-factor authentication
userSchema.methods.enableTwoFactor = async function() {
    const secret = speakeasy.generateSecret();
    this.twoFactorSecret = secret.base32;
    this.isTwoFactorEnabled = true;

    const qrCodeUrl = speakeasy.otpauthURL({
        secret: secret.ascii,
        label: 'YourAppName',
        issuer: 'YourAppName'
    });
    try {
        const qrCodeDataUrl = await qrcode.toDataURL(qrCodeUrl);
        return { qrCodeDataUrl, secret: secret.base32 }; 
    } catch (err) {
        throw new Error('Error generating QR code');
    }
};

// Verify two-factor authentication token
userSchema.methods.verifyTwoFactor = function(token) {
    return speakeasy.totp.verify({
        secret: this.twoFactorSecret,
        encoding: 'base32',
        token: token
    });
};

// Export the User model
export default mongoose.model('User', userSchema);
