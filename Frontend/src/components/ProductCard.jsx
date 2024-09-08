import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Assuming you have an AuthContext

const Navbar = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const { isAuthenticated } = useAuth(); // Auth hook to check if the user is authenticated

  const fetchCartItems = async () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/cart', {
        withCredentials: true
      });
      setCartItems(response.data.items); // Adjust according to your response structure
      setShowCart(true);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
      setShowCart(false);
    }
  };

  const handleCartClick = (event) => {
    event.preventDefault();
    fetchCartItems();
  };

  return (
    <nav className="bg-black fixed w-full z-10 top-0 shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div>
          <Link to="/" className="text-gold text-2xl font-bold">
            LuxShop
          </Link>
        </div>
        <div className="flex items-center">
          <Link to="/about" className="text-white hover:text-gold mx-4">
            About
          </Link>
          <Link to="/contact" className="text-white hover:text-gold mx-4">
            Contact
          </Link>
          {/* Shopping Cart Icon */}
          <button
            onClick={handleCartClick}
            className="text-white hover:text-gold mx-4 flex items-center"
          >
            <ShoppingCartIcon className="h-6 w-6" />
          </button>
          {/* Cart Items Display */}
          {showCart && (
            <div className="absolute top-16 right-0 bg-white text-black p-4 shadow-lg rounded-md">
              <h3 className="font-bold text-lg mb-2">Your Cart</h3>
              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.product._id} className="mb-2">
                      <div className="flex justify-between">
                        <span>{item.product.name}</span>
                        <span>${item.product.price}</span>
                      </div>
                      <span>Quantity: {item.quantity}</span>
                    </li>
                  ))}
                </ul>
              )}
              <Link to="/checkout" className="block mt-2 text-blue-500 hover:underline">Checkout</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
