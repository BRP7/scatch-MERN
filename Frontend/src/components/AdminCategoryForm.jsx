import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CategoryForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/categories/create', {
                name,
                description,
            });

            if (response.status === 200) {
                navigate('/categories');
            }
        } catch (error) {
            setError('Error creating category');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-dark-gradient relative">
            <div className="absolute inset-0 sparkle-dust"></div>
            <div className="bg-black p-8 rounded-lg shadow-md max-w-md w-full relative z-10">
                <h2 className="text-2xl font-bold text-gold mb-6">Create Category</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gold text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border-b-2 border-gold bg-transparent text-white rounded w-full py-2 px-3 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gold text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border-b-2 border-gold bg-transparent text-white rounded w-full py-2 px-3 focus:outline-none"
                            rows="4"
                        />
                    </div>
                    <button
                        type="submit"
                        className="lux-button mt-4 w-full"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CategoryForm;
