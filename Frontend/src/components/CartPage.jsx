import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'; // Ensure correct icon names

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editableItem, setEditableItem] = useState(null); // Track the item being edited
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
        setCartItems(response.data.items || []); // Ensure `items` is not undefined
      } catch (error) {
        setError('Failed to fetch cart items. Please try again later.');
        console.error('Failed to fetch cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [isAuthenticated]);

  const handleQuantityChange = async (itemId, quantity) => {
    try {
      await axios.put(`http://localhost:5000/api/cart/${itemId}`, { quantity }, {
        withCredentials: true
      });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product._id === itemId
            ? { ...item, quantity }
            : item
        )
      );
      setEditableItem(null); // Exit editing mode
    } catch (error) {
      console.error('Failed to update quantity:', error);
      alert('Failed to update quantity. Please try again.');
    }
  };

  const handleDecrease = (item) => {
    if (item.quantity > 0) {
      handleQuantityChange(item.product._id, item.quantity - 1);
    }
  };

  const handleIncrease = (item) => {
    if (item.quantity < item.product.stock) {
      handleQuantityChange(item.product._id, item.quantity + 1);
    }
  };

  const handleEdit = (item) => {
    setEditableItem(item.product._id);
  };

  const handleSave = (item) => {
    const newQuantity = parseInt(item.editableQuantity, 10);
    if (newQuantity >= 0 && newQuantity <= item.product.stock) {
      handleQuantityChange(item.product._id, newQuantity);
    } else {
      alert('Invalid quantity. Please enter a value between 0 and the available stock.');
    }
  };

  const handleDiscard = () => {
    setEditableItem(null);
  };

  const handleChange = (event, item) => {
    setCartItems((prevItems) =>
      prevItems.map((i) =>
        i.product._id === item.product._id
          ? { ...i, editableQuantity: event.target.value }
          : i
      )
    );
  };

  const handleBlur = (item) => {
    handleSave(item); // Save changes when input loses focus
  };

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
                <div className="w-1/4 flex justify-center">
                  <img
                    src={item.product.images && item.product.images[0]} // Adjust if images is an array
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </div>
                <div className="w-3/4 ml-4 flex justify-between items-center">
                  <div className="flex-grow flex flex-col">
                    <h2 className="text-xl font-semibold">{item.product.name}</h2>
                    {editableItem === item.product._id ? (
                      <div className="flex items-start">
                        <input
                          type="number"
                          min="0"
                          max={item.product.stock}
                          value={item.editableQuantity || item.quantity}
                          onChange={(e) => handleChange(e, item)}
                          onBlur={() => handleBlur(item)}
                          className="w-16 text-center bg-gray-800 text-white border border-gray-600 rounded-md"
                          onKeyDown={(e) => {
                            if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                              e.preventDefault(); // Prevent non-numeric input
                            }
                          }}
                        />
                        <button
                          onClick={() => handleSave(item)}
                          className="ml-2 text-green-500 hover:text-green-700"
                        >
                          <CheckIcon className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() => handleDiscard(item)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <XMarkIcon className="w-6 h-6" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <button
                          onClick={() => handleDecrease(item)}
                          className="lux-button mx-1"
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          onClick={() => handleIncrease(item)}
                          className="lux-button mx-1"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="ml-4 text-blue-500 hover:text-blue-700"
                        >
                          <PencilIcon className="w-6 h-6" />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-lg font-bold text-gold">{item.product.price}</p> {/* Price positioned to the right */}
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
