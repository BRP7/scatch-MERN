import React, { useState } from 'react';
import axios from 'axios';

const AdminProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        images: null, // Changed to handle file uploads
        seller: ''
    });
    const [message, setMessage] = useState('');

    // Options for category and seller dropdowns
    const categories = [
        'Luxury Handbags', 'Designer Bags', 'Vintage Bags', 'Tote Bags', 
        'Clutches', 'Shoulder Bags', 'Crossbody Bags', 'Satchels'
    ];
    const sellers = [
        'Seller 1', 'Seller 2', 'Seller 3', 'Seller 4'
    ];

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        // Handle file upload
        if (name === 'images') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData to handle file uploads
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await axios.post('/api/product/create', formDataToSend, { 
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true 
            });
            setMessage('Product added successfully!');
            setFormData({
                name: '',
                description: '',
                price: '',
                stock: '',
                category: '',
                images: null,
                seller: ''
            });
        } catch (error) {
            setMessage('Error adding product: ' + error.response.data.message);
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
            {message && <p className="mb-4 text-red-500">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Description:
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Price:
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Stock:
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Category:
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Images:
                        <input
                            type="file"
                            name="images"
                            onChange={handleChange}
                            className="mt-1 block w-full"
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Seller:
                        <select
                            name="seller"
                            value={formData.seller}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                        >
                            <option value="">Select Seller</option>
                            {sellers.map(seller => (
                                <option key={seller} value={seller}>{seller}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AdminProductForm;
