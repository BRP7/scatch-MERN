import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const addToWishlist = (product) => {
        setWishlist([...wishlist, product]);
    };

    return (
        <div className="p-6 md:p-8 lg:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                        <img src={product.images[0] || 'https://via.placeholder.com/150'} alt={product.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                            <p className="text-xl font-bold text-gray-900 mt-2">${product.price.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between p-4 border-t border-gray-200">
                            <button
                                onClick={() => addToCart(product)}
                                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md transition"
                            >
                                <FaShoppingCart />
                                <span>Add to Cart</span>
                            </button>
                            <button
                                onClick={() => addToWishlist(product)}
                                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md transition"
                            >
                                <FaHeart />
                                <span>Add to Wishlist</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shop;
