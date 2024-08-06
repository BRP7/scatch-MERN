import express from 'express';
import bodyParser from 'body-parser';
import corsMiddleware from './middlewares/corsMiddleware.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import connectDB from './db/connectDB.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(corsMiddleware); // Use CORS middleware here

connectDB();

app.get('/check-cookies', (req, res) => {
    res.json({ cookies: req.cookies });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
