import mongoose from "mongoose";

const sellerSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: { 
        type: String, 
        enum: ['user', 'admin', 'seller', 'premium seller'], 
        default: 'user' 
    },
    storeName: {
        type: String,
        required: true
    },
    storeDescription: {
        type: String
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Seller = mongoose.model('Seller', sellerSchema);
export default Seller;


// module.exports = mongoose.model('Seller', sellerSchema);
