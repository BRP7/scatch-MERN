import React, { useState, useEffect } from 'react';
import AdminProductForm from './AdminProductForm'; // Adjust the import path
import axios from 'axios';

const AdminProductManager = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/product/admin/products', { withCredentials: true });
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleEdit = (product) => {
        setSelectedProduct(product);
    };

    const handleProductSaved = () => {
        // Refresh product list or handle updated product list
        // Reset selected product
        setSelectedProduct(null);
    };

    return (
        <div>
            <h1 className="text-3xl font-semibold mb-6 text-gold">Admin Product Management</h1>
            <AdminProductForm productToEdit={selectedProduct} onProductSaved={handleProductSaved} />
            <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gold">Product List</h2>
                <table className="min-w-full bg-black border border-gold">
                    <thead>
                        <tr>
                            <th className="border-b border-gold p-4 text-gold">Name</th>
                            <th className="border-b border-gold p-4 text-gold">Price</th>
                            <th className="border-b border-gold p-4 text-gold">Stock</th>
                            <th className="border-b border-gold p-4 text-gold">Category</th>
                            <th className="border-b border-gold p-4 text-gold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td className="border-b border-gold p-4 text-white">{product.name}</td>
                                <td className="border-b border-gold p-4 text-white">${product.price}</td>
                                <td className="border-b border-gold p-4 text-white">{product.stock}</td>
                                <td className="border-b border-gold p-4 text-white">{product.category}</td>
                                <td className="border-b border-gold p-4 text-white">
                                    <button
                                        onClick={() => handleEdit(product)}
                                        className="bg-gold hover:bg-gold-dark text-black px-2 py-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="bg-red-600 hover:bg-red-800 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProductManager;
