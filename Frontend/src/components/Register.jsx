import React, { useState } from 'react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        country: '',
        zipCode: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!name || !email || !password || !phoneNumber) {
                alert('Please fill out all required fields.');
                return;
            }

            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, phoneNumber, address }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Network response was not ok.');
            }

            const data = await response.json();
            console.log('Registration successful:', data);
            navigate('/profile'); 
        } catch (error) {
            console.error('Registration error:', error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 space-y-8">
                <h2 className="text-2xl font-semibold text-gray-900">Create your account</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <input id="name" name="name" type="text" required
                                className="block w-full px-3 py-2 border-b border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 sm:text-sm"
                                placeholder="Name *" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <input id="email" name="email" type="email" autoComplete="email" required
                                className="block w-full px-3 py-2 border-b border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 sm:text-sm"
                                placeholder="Email address *" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <input id="password" name="password" type="password" autoComplete="new-password" required
                                className="block w-full px-3 py-2 border-b border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 sm:text-sm"
                                placeholder="Password *" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <input id="phoneNumber" name="phoneNumber" type="text" required
                                className="block w-full px-3 py-2 border-b border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 sm:text-sm"
                                placeholder="Phone Number *" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </div>
                        <div>
                            <input id="street" name="street" type="text"
                                className="block w-full px-3 py-2 border-b border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 sm:text-sm"
                                placeholder="Street" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
                        </div>
                        <div>
                            <input id="city" name="city" type="text"
                                className="block w-full px-3 py-2 border-b border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 sm:text-sm"
                                placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                        </div>
                        <div>
                            <input id="state" name="state" type="text"
                                className="block w-full px-3 py-2 border-b border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 sm:text-sm"
                                placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
                        </div>
                        <div>
                            <input id="country" name="country" type="text"
                                className="block w-full px-3 py-2 border-b border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 sm:text-sm"
                                placeholder="Country" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} />
                        </div>
                        <div>
                            <input id="zipCode" name="zipCode" type="text"
                                className="block w-full px-3 py-2 border-b border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 sm:text-sm"
                                placeholder="ZIP Code" value={address.zipCode} onChange={(e) => setAddress({ ...address, zipCode: e.target.value })} />
                        </div>
                    </div>
                    <div>
                        <button type="submit"
                            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
