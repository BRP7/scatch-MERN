import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js'; // Adjust path as needed
import User from './models/user.models.js'; // Adjust path as needed
import Seller from './models/seller.models.js'; // Adjust path as needed

dotenv.config();

const createSeller = async () => {
    await connectDB();

    try {
        const user = await User.findOne({ email: 'admin@gmail.com' });

        if (!user) {
            console.error('User not found');
            return;
        }

        const seller = new Seller({
            user: user._id,
            storeName: 'Swiss Store',
            role: 'premium seller',
            storeDescription: 'A premium store for Swiss products',
            products: [],
            isActive: true
        });

        await seller.save();
        // console.log('Seller created successfully:', seller);
    } catch (error) {
        console.error('Error creating seller:', error);
    } finally {
        mongoose.connection.close(); // Close the connection
    }
};

createSeller();
