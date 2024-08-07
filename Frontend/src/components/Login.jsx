import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include' // Include credentials to send cookies
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.message === 'Login successful') {
                console.log('Login successful:', data);
                localStorage.setItem('token', data.token); // Optional, if you also want to store it in localStorage
                alert('Login successful');
                navigate('/profile'); // Redirect to profile page after successful login
            } else {
                console.log('Login failed:', data);
                alert('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 space-y-8">
                <h2 className="text-2xl font-semibold text-gray-900">Sign in to your account</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <input id="email" name="email" type="email" autoComplete="email" required
                                className="block w-full px-3 py-2 border-b border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 sm:text-sm"
                                placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <input id="password" name="password" type="password" autoComplete="current-password" required
                                className="block w-full px-3 py-2 border-b border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 sm:text-sm"
                                placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <button type="submit"
                            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
