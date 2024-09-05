import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsAuthenticated } = useAuth(); // Ensure this is correctly used
  console.log('useAuth:', { setIsAuthenticated }); 


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      }, { withCredentials: true });

      if (response.status === 200) {
        setIsAuthenticated(true);
        console.log('useAuth:', { setIsAuthenticated });
        console.log('useAuth:', { setIsAuthenticated });

        const { from = '/profile', productId } = location.state || {};
        if (productId) {
          navigate(`/product/${productId}`);
        } else {
          navigate(from);
        }
      }
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-dark-gradient">
      <div className="bg-black p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-gold mb-6">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gold text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gold bg-black text-white rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gold text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-gold bg-black text-white rounded w-full py-2 px-3"
              required
            />
          </div>
          <button
            type="submit"
            className="lux-button mt-4 w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
