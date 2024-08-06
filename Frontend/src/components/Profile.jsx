import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users/profile', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
        
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
        
                const data = await response.json();
                setUser(data.user);
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/login');
            }
        };
        

        fetchUserData();
    }, [navigate]);

    const handleViewOrders = () => {
        navigate('/orders');
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">{user.fullname}</h2>
                    <p className="text-gray-600">{user.email}</p>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="font-medium">Username:</span>
                        <span>{user.username}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">Member Since:</span>
                        <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                    <button
                        onClick={handleViewOrders}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    >
                        View Orders
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
