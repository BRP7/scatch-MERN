import cloudinary from '../configurations/cloudinaryConfig.js';
import cloudinary from '../configurations/cloudinaryConfig.js'; // Import Cloudinary configuration
import Product from '../models/product.models.js';
import Category from '../models/category.models.js';
import Review from '../models/review.models.js';


export const createProduct = async (req, res) => {
    const { name, description, price, stock, category: categoryId, seller } = req.body;
    console.log(req.body);
    const images = req.files ? req.files.map(file => file.path) : [];

    try {
        console.log(categoryId);
        // Find the category by ID
        const categoryData = await Category.findById(categoryId);
        console.log(categoryData);
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

// Controller for paginated products
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


export const getAllProductsForAdmin = async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products
        res.json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
};


export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the product and its category
        const product = await Product.findById(id).populate('category');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Remove the product from the category's products array
        await Category.findByIdAndUpdate(product.category, { $pull: { products: id } });

        // Delete the product
        await Product.findByIdAndDelete(id);

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
    }
};



export const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log('Fetching product with ID:', productId);

    const product = await Product.findById(productId)
      .populate('category', 'name')
      .populate({
        path: 'reviews',
        model: 'Review',  // Ensure this matches the model name
      })
      .populate('seller', 'storeName');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product details' });
  }
};


export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, category: categoryId, seller } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    try {
        // Find the product by ID
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the category by ID
        const categoryData = await Category.findById(categoryId);
        if (!categoryData) {
            return res.status(400).json({ message: 'Category not found' });
        }

        // Handle image uploads and updates
        let uploadedImages = product.images; // Preserve existing images
        if (images.length > 0) {
            // Upload new images to Cloudinary
            const newImages = await Promise.all(images.map(async (imagePath) => {
                const result = await cloudinary.uploader.upload(imagePath);
                return result.secure_url; // URL of the uploaded image
            }));
            uploadedImages = [...uploadedImages, ...newImages];
        }

        // Update product details
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock || product.stock;
        product.category = categoryData._id;
        product.images = uploadedImages;
        product.seller = seller || product.seller;

        await product.save();

        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


  
