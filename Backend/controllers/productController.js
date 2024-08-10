import Product from '../models/product.models.js';

export const createProduct = async (req, res) => {
    const { name, description, price, stock, category, images, seller } = req.body;

    try {
        const newProduct = new Product({
            name,
            description,
            price,
            stock,
            category,
            images,
            seller
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getProduct = (req, res) => {
    // controller logic
};