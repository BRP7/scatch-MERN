import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AdminProductForm = ({ onProductSaved }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        images: null,
        seller: ''
    });
    const [message, setMessage] = useState('');
    const [sellers, setSellers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/categories', { withCredentials: true });
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchSellers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/sellers');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const sellersData = await response.json();
                setSellers(sellersData);
            } catch (error) {
                console.error('Error fetching sellers:', error);
            }
        };

        const fetchProduct = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/product/admin/${id}`, {
                        withCredentials: true
                    });
                    setFormData({
                        name: response.data.name || '',
                        description: response.data.description || '',
                        price: response.data.price || '',
                        stock: response.data.stock || '',
                        category: response.data.category || '',
                        images: null,
                        seller: response.data.seller || ''
                    });
                    setIsEditMode(true);
                } catch (error) {
                    console.error('Error fetching product:', error);
                    setMessage('Error fetching product: ' + error.response?.data?.message || 'Server error');
                }
            }
        };
        

        fetchCategories();
        fetchSellers();
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'images') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            if (name === 'category' && typeof value !== 'string') {
                console.error('Category value should be a string');
            }
            setFormData({ ...formData, [name]: value });
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            if (formData[key]) {
                console.log(`Appending ${key}: ${formData[key]}`);
                formDataToSend.append(key, formData[key]);
            }
        }
    
        try {
            let response;
            if (isEditMode) {
                response = await axios.put(`http://localhost:5000/api/product/update/${id}`, formDataToSend, { 
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true 
                });
                setMessage('Product updated successfully!');
            } else {
                response = await axios.post('http://localhost:5000/api/product/create', formDataToSend, { 
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true 
                });
                setMessage('Product added successfully!');
            }
            // onProductSaved();
            navigate('/admin/products');
        } catch (error) {
            console.error('Error response data:', error);
            setMessage('Error saving product: ' + (error.response?.data?.message || 'Server error'));
        }
    };
    
    
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-dark-gradient relative">
            <div className="absolute inset-0 sparkle-dust"></div>
            <div className="bg-black p-8 rounded-lg shadow-md border border-gold max-w-lg w-full relative z-10 mt-16">
                <h2 className="text-2xl font-semibold mb-4 text-gold">{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>
                {message && <p className="mb-4 text-red-500">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gold text-sm font-semibold mb-2">
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gold rounded-lg px-3 py-2 bg-black text-white"
                                required
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gold text-sm font-semibold mb-2">
                            Description:
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gold rounded-lg px-3 py-2 bg-black text-white"
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gold text-sm font-semibold mb-2">
                            Price:
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gold rounded-lg px-3 py-2 bg-black text-white"
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gold text-sm font-semibold mb-2">
                            Stock:
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gold rounded-lg px-3 py-2 bg-black text-white"
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gold text-sm font-semibold mb-2">
                            Category:
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gold rounded-lg px-3 py-2 bg-black text-white"
                            >
                                <option value="">Select Category</option>
                                {categories.map(category => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gold text-sm font-semibold mb-2">
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
                        <label className="block text-gold text-sm font-semibold mb-2">
                            Seller:
                            <select
                                name="seller"
                                value={formData.seller}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gold rounded-lg px-3 py-2 bg-black text-white"
                            >
                                <option value="">Select Seller</option>
                                {sellers.map(seller => (
                                    <option key={seller._id} value={seller._id}>{seller.storeName}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="bg-gold hover:bg-gold-dark text-black px-4 py-2 rounded-lg mt-4 w-full"
                    >
                        {isEditMode ? 'Update Product' : 'Add Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminProductForm;
