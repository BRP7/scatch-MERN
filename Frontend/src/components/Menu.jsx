import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import Cookies from 'js-cookie';
import axios from 'axios';

const Navbar = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const fetchCartItems = async () => {
    try {
      // Fetch the JWT from cookies
      const token = Cookies.get('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      // Make the API request to get the cart items
      const response = await axios.get('/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCartItems(response.data.items); // Adjust according to your response structure
      setShowCart(true);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
    }
  };

  const handleCartClick = () => {
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
