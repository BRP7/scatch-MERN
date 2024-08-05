import User from '../models/user.models.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, address } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // const hashedPassword = await bcrypt.hash(password, 10); // hashing password in pre middleware so don't do it here

        const user = new User({ name, email, password, phoneNumber, address });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JSON_SECRET, { expiresIn: '5h' });
        
        // Set token as cookie
        res.cookie('token', token, {
            httpOnly: true, // ensures the cookie is not accessible via JavaScript on the client-side
            secure: process.env.NODE_ENV === 'production', // set to true in production
            maxAge: 5 * 60 * 60 * 1000, // 5 hours
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed' });
    }
};



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await user.comparePassword(password);

        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token and send response
        const token = jwt.sign({ id: user._id }, process.env.JSON_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });
    res.json({ message: 'Logout successful' });
};


// Password recovery (optional)
export const forgotPassword = async (req, res) => {
    // Implementation for forgot password
};

export const resetPassword = async (req, res) => {
    // Implementation for reset password
};
