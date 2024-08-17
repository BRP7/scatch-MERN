import cloudinary from '../configurations/cloudinaryConfig.js'; // Import Cloudinary configuration
import Product from '../models/product.models.js';
import Category from '../models/category.models.js';

export const createProduct = async (req, res) => {
    const { name, description, price, stock, category: categoryName, seller } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    try {
        // Find the category by name
        const categoryData = await Category.findOne({ name: categoryName });
        if (!categoryData) {
            return res.status(400).json({ message: 'Category not found' });
        }

        // Upload images to Cloudinary
        const uploadedImages = await Promise.all(images.map(async (imagePath) => {
            const result = await cloudinary.uploader.upload(imagePath);
            return result.secure_url; // URL of the uploaded image
        }));

        // Create the new product
        const newProduct = new Product({
            name,
            description,
            price,
            stock,
            category: categoryData._id,
            images: uploadedImages,
            seller
        });

        // Save the product
        await newProduct.save();

        // Add the new product ID to the category's products array
        categoryData.products.push(newProduct._id);
        await categoryData.save();

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



// <form action="/api/product/create" method="POST" encType="multipart/form-data">
//     {/* <!-- Other form fields --> */}
//     <input type="file" name="images" multiple />
//     <button type="submit">Submit</button>
// </form>

export const getPaginatedProducts = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;  // Default to page 1 and 10 items per page

    try {
        const products = await Product.find()
            .skip((page - 1) * limit)  // Skip the items before the current page
            .limit(parseInt(limit));   // Limit the number of items per page

        const totalProducts = await Product.countDocuments();  // Total number of products

        res.json({
            products,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getProduct = (req, res) => {
    // controller logic
};