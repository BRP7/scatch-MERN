import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        address: {
            street: '',
            city: '',
            state: '',
            country: '',
            zipCode: '',
        },
    });
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/profile', {
                    withCredentials: true,
                });

                if (!response.data) {
                    throw new Error('User data not found');
                }

                setUser(response.data);
                setFormData({
                    name: response.data.name,
                    phoneNumber: response.data.phoneNumber,
                    email: response.data.email,
                    address: response.data.address || {},
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            setFormData({
                ...formData,
                address: {
                    ...formData.address,
                    [name.split('.')[1]]: value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put('http://localhost:5000/api/users/profile', formData, {
                withCredentials: true,
            });

            if (response.status === 200) {
                setUser(response.data);
                setEditMode(false);
                console.log('Profile updated successfully');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleLogout = async () => {
        try {
          await axios.post("http://localhost:5000/api/auth/logout", {}, {
            withCredentials: true, 
          });
          navigate('/login');
        } catch (error) {
          console.error("Error logging out:", error);
          alert("Logout failed. Please try again.");
        }
      };
    
      if (!user) {
        return (
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
            <div className="ml-4 text-gray-900 text-2xl font-semibold">
              Loading..
            </div>
          </div>
        );
      }
    

    const addressLine = user.address ? 
        `${user.address.street || ''}, ${user.address.city || ''}, ${user.address.state || ''}, ${user.address.country || ''} ${user.address.zipCode || ''}`
        : '';

    const displayAddress = addressLine.trim() || 'Not provided';

    return (
        <div className={isDarkMode ? 'dark' : ''}>
            <div className={`profile-container ${isDarkMode ? 'dark' : ''}`}>
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center">
                            <div className="rounded-full h-16 w-16 bg-gray-300 flex items-center justify-center">
                                <span className="text-xl font-semibold text-gray-600">{user.name.charAt(0)}</span>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                                <p className="text-gray-600">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    <div className={`bg-white ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900'} rounded-lg shadow-md p-6 mb-8`}>
                        <h3 className="text-xl font-bold">Your Details</h3>
                        {editMode ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-gray-600 mb-2 block">
                                        Name:
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="border-b border-gray-300 px-3 py-2 rounded-md w-full mt-1 focus:outline-none focus:border-blue-500"
                                        />
                                    </label>
                                    <label className="text-gray-600 mb-2 block">
                                        Phone Number:
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            className="border-b border-gray-300 px-3 py-2 rounded-md w-full mt-1 focus:outline-none focus:border-blue-500"
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label className="text-gray-600 mb-2 block">
                                        Email:
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="border-b border-gray-300 px-3 py-2 rounded-md w-full mt-1 focus:outline-none focus:border-blue-500"
                                        />
                                    </label>
                                    <label className="text-gray-600 mb-2 block">
                                        Street:
                                        <input
                                            type="text"
                                            name="address.street"
                                            value={formData.address.street}
                                            onChange={handleInputChange}
                                            className="border-b border-gray-300 px-3 py-2 rounded-md w-full mt-1 focus:outline-none focus:border-blue-500"
                                        />
                                    </label>
                                    <label className="text-gray-600 mb-2 block">
                                        City:
                                        <input
                                            type="text"
                                            name="address.city"
                                            value={formData.address.city}
                                            onChange={handleInputChange}
                                            className="border-b border-gray-300 px-3 py-2 rounded-md w-full mt-1 focus:outline-none focus:border-blue-500"
                                        />
                                    </label>
                                    <label className="text-gray-600 mb-2 block">
                                        State:
                                        <input
                                            type="text"
                                            name="address.state"
                                            value={formData.address.state}
                                            onChange={handleInputChange}
                                            className="border-b border-gray-300 px-3 py-2 rounded-md w-full mt-1 focus:outline-none focus:border-blue-500"
                                        />
                                    </label>
                                    <label className="text-gray-600 mb-2 block">
                                        Country:
                                        <input
                                            type="text"
                                            name="address.country"
                                            value={formData.address.country}
                                            onChange={handleInputChange}
                                            className="border-b border-gray-300 px-3 py-2 rounded-md w-full mt-1 focus:outline-none focus:border-blue-500"
                                        />
                                    </label>
                                    <label className="text-gray-600 mb-2 block">
                                        Zip Code:
                                        <input
                                            type="text"
                                            name="address.zipCode"
                                            value={formData.address.zipCode}
                                            onChange={handleInputChange}
                                            className="border-b border-gray-300 px-3 py-2 rounded-md w-full mt-1 focus:outline-none focus:border-blue-500"
                                        />
                                    </label>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-600 mb-2">
                                        <span className="font-semibold">Name:</span> {user.name}
                                    </p>
                                    <p className="text-gray-600 mb-2">
                                        <span className="font-semibold">Phone:</span> {user.phoneNumber}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-600 mb-2">
                                        <span className="font-semibold">Email:</span> {user.email}
                                    </p>
                                    <p className="text-gray-600 mb-2">
                                        <span className="font-semibold">Address:</span> {displayAddress}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end">
                        {editMode ? (
                            <button
                                onClick={handleSave}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                onClick={toggleEditMode}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                            >
                                Edit
                            </button>
                        )}
                    </div>

                    <div className={`bg-white ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900'} rounded-lg shadow-md p-6 mt-8`}>
                        <h3 className="text-xl font-bold">Order History</h3>
                        <div className="space-y-4">
                            <div className="border border-gray-200 p-4 rounded-lg shadow-sm">
                                <p className="text-gray-800 font-semibold">Order #12345</p>
                                <p className="text-gray-600">Date: July 20, 2024</p>
                                <p className="text-gray-600">Total: $120.00</p>
                                <p className="text-green-600 font-semibold">Status: Delivered</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
