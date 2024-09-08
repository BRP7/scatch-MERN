import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editableItem, setEditableItem] = useState(null);
  const [tempQuantities, setTempQuantities] = useState({});
  const [validationMessages, setValidationMessages] = useState({});

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart', {
          withCredentials: true
        });
        setCartItems(response.data.items || []);
      } catch (error) {
        setError('Failed to fetch cart items.');
        console.error('Failed to fetch cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

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
      setEditableItem(null);
      setTempQuantities({});
      setValidationMessages({});
    } catch (error) {
      console.error('Failed to update quantity:', error);
      alert('Failed to update quantity.');
    }
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      setTempQuantities((prev) => ({
        ...prev,
        [item.product._id]: newQuantity
      }));
      validateQuantity(item.product._id, newQuantity);
    }
  };

  const handleIncrease = (item) => {
    if (item.quantity < item.product.stock) {
      const newQuantity = item.quantity + 1;
      setTempQuantities((prev) => ({
        ...prev,
        [item.product._id]: newQuantity
      }));
      validateQuantity(item.product._id, newQuantity);
    } else {
      setValidationMessages((prev) => ({
        ...prev,
        [item.product._id]: 'Stock limit reached.'
      }));
    }
  };

  const validateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      setValidationMessages((prev) => ({
        ...prev,
        [itemId]: 'Quantity must be greater than 0.'
      }));
    } else if (quantity > cartItems.find(item => item.product._id === itemId).product.stock) {
      setValidationMessages((prev) => ({
        ...prev,
        [itemId]: 'Stock limit reached.'
      }));
    } else {
      setValidationMessages((prev) => ({
        ...prev,
        [itemId]: ''
      }));
    }
  };

  const handleSave = async (item) => {
    const newQuantity = tempQuantities[item.product._id] || item.quantity;
    if (newQuantity > 0 && newQuantity <= item.product.stock) {
      await handleQuantityChange(item.product._id, newQuantity);
    } else {
      setValidationMessages((prev) => ({
        ...prev,
        [item.product._id]: 'Invalid quantity.'
      }));
    }
  };

  const handleDiscard = () => {
    setTempQuantities({});
    setEditableItem(null);
    setValidationMessages({});
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
                    src={item.product.images && item.product.images[0]}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </div>
                <div className="w-3/4 ml-4 flex justify-between items-center">
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold">{item.product.name}</h2>
                    <div className="flex items-center mt-2">
                      {editableItem === item.product._id ? (
                        <div className="flex items-center">
                          <button
                            onClick={() => handleDecrease(item)}
                            className="lux-button mx-1"
                          >
                            -
                          </button>
                          <span className="mx-2">{tempQuantities[item.product._id] || item.quantity}</span>
                          <button
                            onClick={() => handleIncrease(item)}
                            className="lux-button mx-1"
                          >
                            +
                          </button>
                          <button
                            onClick={() => handleSave(item)}
                            className="ml-2 text-green-500 hover:text-green-700"
                          >
                            <CheckIcon className="w-6 h-6" />
                          </button>
                          <button
                            onClick={handleDiscard}
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
                            onClick={() => {
                              setEditableItem(item.product._id);
                              setTempQuantities({ [item.product._id]: item.quantity });
                            }}
                            className="ml-2 text-blue-500 hover:text-blue-700"
                          >
                            <span>Edit</span>
                          </button>
                        </div>
                      )}
                    </div>
                    {validationMessages[item.product._id] && (
                      <p className="text-red-500 mt-2">{validationMessages[item.product._id]}</p>
                    )}
                  </div>
                  <p className="text-lg font-bold text-gold ml-4">
                    ${item.product.price}
                  </p>
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
