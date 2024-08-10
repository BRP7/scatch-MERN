import React, { useState } from 'react';
import axios from 'axios';

const AdminProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        images: '',
        seller: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/products/create', formData, { withCredentials: true });
            setMessage('Product added successfully!');
            setFormData({
                name: '',
                description: '',
                price: '',
                stock: '',
                category: '',
                images: '',
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
                {Object.keys(formData).map((key) => (
                    <div key={key} className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2 capitalize">
                            {key}:
                            <input
                                type="text"
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                            />
                        </label>
                    </div>
                ))}
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
