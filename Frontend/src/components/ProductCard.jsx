import React from 'react';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ProductCard = ({ id, title, price, imageUrl, handleAddToWishlist }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      // Redirect to login and pass the current path and productId
      navigate('/login', { state: { from: location.pathname, productId: id } });
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/cart/add', {
        productId: id,
        quantity: 1
      }, {
        withCredentials: true
      });

      alert('Product added to cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="relative bg-black text-white border border-gold rounded-lg overflow-hidden flex flex-col h-[400px]" onClick={handleClick}>
      <button
        onClick={(e) => { e.stopPropagation(); handleAddToWishlist(); }}
        className="absolute top-3 right-3 text-gray-500 hover:text-gold transition-colors"
      >
        <HeartIcon className="w-6 h-6" />
      </button>
      <div className="w-full h-2/3 flex items-center justify-center bg-black overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            style={{ display: 'block' }}
            onError={(e) => e.target.style.display = 'none'}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-transparent">
            <span className="text-gray-500 text-lg">No Image</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow justify-between">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-gold">${price}</p>
          <button
            onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
            className="lux-button flex items-center"
          >
            <ShoppingCartIcon className="w-5 h-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
