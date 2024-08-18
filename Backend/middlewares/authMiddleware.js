import User from '../models/user.models.js'; 
import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JSON_SECRET);
        const user = await User.getUserById(decoded.id);
        if (!user) return res.status(401).json({ message: 'User not found' });
        
        req.user = user; 
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
