import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/product?page=1&limit=10');
                setProducts(response.data.products);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p className="text-center py-4 text-gray-500">Loading...</p>;
    if (error) return <p className="text-center py-4 text-red-500">Error fetching products: {error}</p>;

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto p-8">
                <h1 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white text-center">Our Collection</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                    {products.map(product => (
                        <ProductCard 
                            key={product._id} 
                            product={product} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Shop;
