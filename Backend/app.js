import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import corsMiddleware from './middlewares/corsMiddleware.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import connectDB from './db/connectDB.js';
import sellerRoutes from './routes/seller.routes.js';
import categoryRouter from './routes/category.router.js'
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(corsMiddleware);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

connectDB();


app.get('/check-cookies', (req, res) => {
    res.json({ cookies: req.cookies });
});


app.get('/', async (req, res) => {
    try {
        const products = await  Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/categories', categoryRouter);
// app.use('/api/addtocart', addToCartRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
