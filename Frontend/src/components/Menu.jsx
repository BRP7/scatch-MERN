import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Assuming you have an AuthContext

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth(); // Auth hook to check if the user is authenticated

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!isAuthenticated) {
        window.location.href = '/login'; // Redirect if not authenticated
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/cart', {
          withCredentials: true
        });
        setCartItems(response.data.items); // Adjust according to your response structure
      } catch (error) {
        setError('Failed to fetch cart items');
        console.error('Failed to fetch cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [isAuthenticated]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-dark-gradient min-h-screen p-5">
      <header className="text-center p-5 text-gold font-cinzel text-5xl">
        Your Cart
      </header>
      <div className="container mx-auto px-6 py-12">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.product._id}
                className="flex items-center bg-black text-white p-4 rounded-md border border-gold"
              >
                <div className="w-1/4">
                  <img
                    src={item.product.images && item.product.images[0]} // Adjust if images is an array
                    alt={item.product.name}
                    className="w-full h-auto object-cover rounded-md"
                  />
                </div>
                <div className="w-3/4 ml-4 flex justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{item.product.name}</h2>
                    <p className="text-lg">Quantity: {item.quantity}</p>
                  </div>
                  <p className="text-lg font-bold text-gold">${item.product.price}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-8 text-center">
          <button className="lux-button">
            <a href="/checkout">Proceed to Checkout</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
