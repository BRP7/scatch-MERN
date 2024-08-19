import React from 'react';
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ id, title, price, imageUrl, handleAddToCart, handleAddToWishlist }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`); // Use 'id' to navigate to the product detail page
  };

  return (
    <div className="relative bg-black text-white border border-gold rounded-lg overflow-hidden flex flex-col h-[400px]" onClick={handleClick}>
      {/* Wishlist Icon */}
      <button
        onClick={(e) => { e.stopPropagation(); handleAddToWishlist(); }}
        className="absolute top-3 right-3 text-gray-500 hover:text-gold transition-colors"
      >
        <HeartIcon className="w-6 h-6" />
      </button>

      {/* Product Image */}
      <div className="w-full h-2/3 flex items-center justify-center bg-black overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            style={{ display: 'block' }}
            onError={(e) => e.target.style.display = 'none'} // Hide broken image
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-transparent">
            <span className="text-gray-500 text-lg">No Image</span>
          </div>
        )}
      </div>

      {/* Product Details */}
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
